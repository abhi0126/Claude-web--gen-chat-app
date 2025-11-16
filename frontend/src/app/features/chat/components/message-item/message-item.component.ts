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
          <div class="user-bubble">
            {{ message.content }}
          </div>
        } @else {
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
                <span class="error-icon">⚠</span>
                {{ message.error }}
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .message-item {
      padding: 1rem 0;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* User message styles */
    .user-message .message-content {
      display: flex;
      justify-content: flex-end;
    }

    .user-bubble {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      padding: 0.75rem 1rem;
      border-radius: 12px;
      max-width: 80%;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    /* Assistant message styles */
    .assistant-message .message-content {
      display: flex;
      justify-content: flex-start;
    }

    .assistant-content {
      width: 100%;
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--text-primary);
    }

    /* Streaming indicator */
    .streaming-indicator {
      display: flex;
      gap: 0.5rem;
      padding: 1rem 0;
    }

    .streaming-indicator .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--accent-primary);
      animation: pulse 1.5s ease-in-out infinite;
    }

    .streaming-indicator .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .streaming-indicator .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
    }

    /* Cursor for streaming */
    .cursor {
      display: inline-block;
      margin-left: 2px;
      color: var(--accent-primary);
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Error message */
    .error-message {
      margin-top: 0.75rem;
      padding: 0.75rem;
      background-color: rgba(239, 68, 68, 0.1);
      border-left: 3px solid #ef4444;
      border-radius: 4px;
      color: #ef4444;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .error-icon {
      font-size: 1rem;
    }
  `]
})
export class MessageItemComponent {
  @Input() message!: Message;
}
