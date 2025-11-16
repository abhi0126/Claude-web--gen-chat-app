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
          <div class="empty-icon-container">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h2>Welcome to AI Chat</h2>
          <p>Start a conversation and explore the possibilities</p>
          <div class="suggestions">
            <div class="suggestion-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <span>Ask me to write code</span>
            </div>
            <div class="suggestion-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>Explain complex topics</span>
            </div>
            <div class="suggestion-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Get answers instantly</span>
            </div>
          </div>
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
      padding: 3rem 2rem;
      max-width: 42rem;
      margin: 0 auto;
      animation: fadeIn 0.6s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .empty-icon-container {
      width: 96px;
      height: 96px;
      border-radius: 24px;
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: var(--accent-primary);
    }

    .empty-state h2 {
      font-size: 1.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      letter-spacing: -0.02em;
    }

    .empty-state p {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }

    .suggestions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      width: 100%;
    }

    .suggestion-card {
      padding: 1rem 1.25rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.2s ease;
      cursor: default;
    }

    .suggestion-card:hover {
      background-color: var(--bg-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    :host-context(.dark) .suggestion-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .suggestion-card svg {
      color: var(--accent-primary);
      flex-shrink: 0;
    }

    .suggestion-card span {
      font-size: 0.875rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    /* Messages container */
    .messages {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      padding: 1rem 0 2rem;
    }

    /* Custom scrollbar */
    .message-list-container::-webkit-scrollbar {
      width: 6px;
    }

    .message-list-container::-webkit-scrollbar-track {
      background: transparent;
    }

    .message-list-container::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 3px;
    }

    .message-list-container::-webkit-scrollbar-thumb:hover {
      background: var(--text-tertiary);
    }

    /* Responsive */
    @media (max-width: 640px) {
      .empty-state {
        padding: 2rem 1.5rem;
      }

      .empty-state h2 {
        font-size: 1.5rem;
      }

      .empty-state p {
        font-size: 0.9375rem;
      }

      .suggestions {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      .suggestion-card {
        padding: 0.875rem 1rem;
      }

      .empty-icon-container {
        width: 80px;
        height: 80px;
      }

      .empty-icon-container svg {
        width: 48px;
        height: 48px;
      }
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
