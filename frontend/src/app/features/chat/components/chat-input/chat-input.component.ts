import { Component, Output, EventEmitter, Input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-input-container">
      <div class="input-wrapper">
        <textarea
          [(ngModel)]="inputText"
          (keydown)="handleKeyDown($event)"
          [disabled]="isDisabled()"
          placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
          rows="1"
          #textarea
          class="chat-textarea"
        ></textarea>
        <button
          class="send-button"
          [disabled]="!canSend() || isDisabled()"
          (click)="sendMessage()"
          [class.disabled]="!canSend() || isDisabled()"
        >
          @if (isDisabled()) {
            <span class="loading-spinner"></span>
          } @else {
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          }
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chat-input-container {
      border-top: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      padding: 1rem;
    }

    .input-wrapper {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      align-items: flex-end;
      gap: 0.75rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 0.75rem;
      transition: border-color 0.2s;
    }

    .input-wrapper:focus-within {
      border-color: var(--accent-primary);
    }

    .chat-textarea {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      resize: none;
      font-family: var(--font-sans);
      font-size: 0.875rem;
      color: var(--text-primary);
      line-height: 1.5;
      max-height: 200px;
      overflow-y: auto;
    }

    .chat-textarea::placeholder {
      color: var(--text-tertiary);
    }

    .chat-textarea:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .send-button {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: none;
      background-color: var(--accent-primary);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .send-button:hover:not(:disabled) {
      background-color: var(--accent-hover);
      transform: scale(1.05);
    }

    .send-button:active:not(:disabled) {
      transform: scale(0.95);
    }

    .send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .send-button.disabled {
      background-color: var(--bg-tertiary);
      color: var(--text-tertiary);
    }

    /* Loading spinner */
    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Scrollbar for textarea */
    .chat-textarea::-webkit-scrollbar {
      width: 6px;
    }

    .chat-textarea::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-textarea::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 3px;
    }
  `]
})
export class ChatInputComponent {
  @Input() isDisabled!: Signal<boolean>;
  @Output() messageSent = new EventEmitter<string>();

  inputText = '';

  canSend = signal(false);

  ngOnInit() {
    // Watch for text changes
    setInterval(() => {
      this.canSend.set(this.inputText.trim().length > 0);
    }, 100);
  }

  handleKeyDown(event: KeyboardEvent): void {
    // Send on Enter (without Shift)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const text = this.inputText.trim();
    if (text && !this.isDisabled()) {
      this.messageSent.emit(text);
      this.inputText = '';
      this.canSend.set(false);
    }
  }
}
