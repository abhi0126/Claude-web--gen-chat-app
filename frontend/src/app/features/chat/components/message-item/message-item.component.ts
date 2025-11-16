import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../../../core/models/message.model';
import { MarkdownRendererComponent } from '../../../../shared/components/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule, MarkdownRendererComponent],
  template: `
    <div class="message-item" [class.user-message]="message.role === 'user'" [class.assistant-message]="message.role === 'assistant'">
      <div class="message-content">
        @if (message.role === 'user') {
          <div class="user-message-wrapper">
            <div class="user-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div class="user-bubble">
              {{ message.content }}
            </div>
          </div>
        } @else {
          <div class="assistant-message-wrapper">
            <div class="assistant-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z"/>
              </svg>
            </div>
            <div class="assistant-content">
              @if (message.isStreaming && !message.content) {
                <div class="streaming-indicator">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              } @else {
                <app-markdown-renderer [content]="message.content" />
                @if (message.isStreaming) {
                  <span class="cursor">▊</span>
                }
              }
              @if (message.error) {
                <div class="error-message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {{ message.error }}
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .message-item {
      padding: 1.5rem 0;
      animation: fadeIn 0.4s ease-out;
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    }

    :host-context(.dark) .message-item {
      border-bottom-color: rgba(255, 255, 255, 0.05);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message-content {
      max-width: 48rem;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* User message styles */
    .user-message-wrapper {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      align-items: flex-start;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .user-bubble {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.875rem 1.125rem;
      border-radius: 18px;
      border-bottom-right-radius: 4px;
      max-width: 75%;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 0.9375rem;
      line-height: 1.6;
      box-shadow: 0 2px 12px rgba(102, 126, 234, 0.25);
      order: -1;
    }

    /* Assistant message styles */
    .assistant-message-wrapper {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }

    .assistant-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
    }

    .assistant-content {
      flex: 1;
      font-size: 0.9375rem;
      line-height: 1.7;
      color: var(--text-primary);
      padding-top: 0.25rem;
    }

    /* Streaming indicator */
    .streaming-indicator {
      display: flex;
      gap: 0.375rem;
      padding: 1rem 0;
    }

    .streaming-indicator .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--accent-primary);
      animation: pulse 1.4s ease-in-out infinite;
    }

    .streaming-indicator .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .streaming-indicator .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.4;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.1);
      }
    }

    /* Cursor for streaming */
    .cursor {
      display: inline-block;
      margin-left: 3px;
      color: var(--accent-primary);
      animation: blink 1s step-end infinite;
      font-weight: 300;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Error message */
    .error-message {
      margin-top: 1rem;
      padding: 1rem 1.125rem;
      background-color: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      color: #dc2626;
      font-size: 0.875rem;
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      line-height: 1.5;
    }

    :host-context(.dark) .error-message {
      background-color: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    .error-message svg {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .message-content {
        padding: 0 1rem;
      }

      .user-bubble {
        max-width: 85%;
        font-size: 0.875rem;
      }

      .assistant-content {
        font-size: 0.875rem;
      }

      .user-avatar,
      .assistant-avatar {
        width: 28px;
        height: 28px;
      }
    }
  `]
})
export class MessageItemComponent {
  @Input() message!: Message;
}
