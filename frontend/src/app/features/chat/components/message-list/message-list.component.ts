import { Component, Input, ElementRef, ViewChild, AfterViewChecked, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../../../core/models/message.model';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent],
  template: `
    <div class="message-list-container" #scrollContainer>
      @if (messages().length === 0) {
        <div class="empty-state">
          <div class="empty-icon">💬</div>
          <h2>Start a Conversation</h2>
          <p>Send a message to begin chatting with AI</p>
        </div>
      } @else {
        <div class="messages">
          @for (message of messages(); track message.id) {
            <app-message-item [message]="message" />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .message-list-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: var(--bg-primary);
      scroll-behavior: smooth;
    }

    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-state h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    /* Messages container */
    .messages {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
    }

    /* Custom scrollbar */
    .message-list-container::-webkit-scrollbar {
      width: 8px;
    }

    .message-list-container::-webkit-scrollbar-track {
      background: var(--bg-secondary);
    }

    .message-list-container::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 4px;
    }

    .message-list-container::-webkit-scrollbar-thumb:hover {
      background: var(--text-tertiary);
    }
  `]
})
export class MessageListComponent implements AfterViewChecked {
  @Input() messages!: Signal<Message[]>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private shouldAutoScroll = true;
  private lastMessageCount = 0;

  constructor() {
    // Watch for message changes and trigger scroll
    effect(() => {
      const messageCount = this.messages().length;
      if (messageCount > this.lastMessageCount) {
        this.shouldAutoScroll = true;
      }
      this.lastMessageCount = messageCount;
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldAutoScroll) {
      this.scrollToBottom();
      this.shouldAutoScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      const element = this.scrollContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
