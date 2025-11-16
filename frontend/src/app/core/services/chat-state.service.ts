import { Injectable, signal, computed } from '@angular/core';
import { Message } from '../models/message.model';
import { GeminiApiService } from './gemini-api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  // Signals for state management
  private messages = signal<Message[]>([]);
  private isLoading = signal<boolean>(false);
  private error = signal<string | null>(null);

  // Computed signals (read-only)
  readonly allMessages = this.messages.asReadonly();
  readonly loading = this.isLoading.asReadonly();
  readonly errorMessage = this.error.asReadonly();

  // Computed: Check if there are any messages
  readonly hasMessages = computed(() => this.messages().length > 0);

  constructor(private geminiApiService: GeminiApiService) {
    // Load messages from localStorage on init
    this.loadMessagesFromStorage();
  }

  /**
   * Send a message and handle streaming response
   */
  sendMessage(content: string): void {
    if (!content.trim()) {
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: this.generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    this.addMessage(userMessage);
    this.isLoading.set(true);
    this.error.set(null);

    // Create placeholder for assistant message
    const assistantMessage: Message = {
      id: this.generateId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };

    this.addMessage(assistantMessage);

    // Stream response from backend
    this.geminiApiService.streamMessage(content).subscribe({
      next: (chunk) => {
        if (chunk.type === 'chunk' && chunk.content) {
          // Append chunk to assistant message
          this.updateLastMessage(assistantMessage.id, chunk.content);
        } else if (chunk.type === 'error') {
          this.error.set(chunk.error || 'An error occurred');
          this.markLastMessageComplete(assistantMessage.id, chunk.error);
        } else if (chunk.type === 'done') {
          this.markLastMessageComplete(assistantMessage.id);
        }
      },
      error: (error) => {
        console.error('Streaming error:', error);
        const errorMsg = error.error || 'Failed to get response. Please try again.';
        this.error.set(errorMsg);
        this.markLastMessageComplete(assistantMessage.id, errorMsg);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
        this.saveMessagesToStorage();
      }
    });
  }

  /**
   * Clear all messages
   */
  clearMessages(): void {
    this.messages.set([]);
    this.error.set(null);
    this.saveMessagesToStorage();
  }

  /**
   * Delete a specific message
   */
  deleteMessage(id: string): void {
    this.messages.update(messages => messages.filter(m => m.id !== id));
    this.saveMessagesToStorage();
  }

  /**
   * Add a message to the list
   */
  private addMessage(message: Message): void {
    this.messages.update(messages => [...messages, message]);
  }

  /**
   * Update the last message by appending content
   */
  private updateLastMessage(id: string, newContent: string): void {
    this.messages.update(messages =>
      messages.map(msg =>
        msg.id === id
          ? { ...msg, content: msg.content + newContent }
          : msg
      )
    );
  }

  /**
   * Mark message as complete (stop streaming)
   */
  private markLastMessageComplete(id: string, error?: string): void {
    this.messages.update(messages =>
      messages.map(msg =>
        msg.id === id
          ? { ...msg, isStreaming: false, error }
          : msg
      )
    );
  }

  /**
   * Generate unique message ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Save messages to localStorage
   */
  private saveMessagesToStorage(): void {
    try {
      localStorage.setItem('chat-messages', JSON.stringify(this.messages()));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }

  /**
   * Load messages from localStorage
   */
  private loadMessagesFromStorage(): void {
    try {
      const stored = localStorage.getItem('chat-messages');
      if (stored) {
        const messages = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const parsedMessages = messages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        this.messages.set(parsedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }
}
