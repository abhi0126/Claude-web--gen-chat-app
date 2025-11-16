import { Component, Output, EventEmitter, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="chat-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo-container">
            <div class="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h1 class="app-title">AI Chat</h1>
          </div>
        </div>
        <div class="header-right">
          @if (hasMessages()) {
            <button class="icon-button" (click)="onClearChat()" title="Clear chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          }
          <button class="icon-button theme-toggle" (click)="onThemeToggle()" [title]="isDark() ? 'Light mode' : 'Dark mode'">
            @if (isDark()) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .chat-header {
      border-bottom: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: all 0.3s ease;
    }

    .header-content {
      max-width: 48rem;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(249, 115, 22, 0.25);
    }

    .app-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      letter-spacing: -0.02em;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }

    .icon-button {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: none;
      background-color: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      position: relative;
    }

    .icon-button:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .icon-button:active {
      transform: scale(0.95);
    }

    .theme-toggle svg {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .theme-toggle:hover svg {
      transform: rotate(20deg);
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .header-content {
        padding: 0.875rem 1rem;
      }

      .app-title {
        font-size: 1rem;
      }

      .logo-icon {
        width: 32px;
        height: 32px;
      }

      .icon-button {
        width: 32px;
        height: 32px;
      }
    }
  `]
})
export class ChatHeaderComponent {
  @Input() isDark!: Signal<boolean>;
  @Input() hasMessages!: Signal<boolean>;
  @Output() themeToggle = new EventEmitter<void>();
  @Output() clearChat = new EventEmitter<void>();

  onThemeToggle(): void {
    this.themeToggle.emit();
  }

  onClearChat(): void {
    if (confirm('Clear all messages? This cannot be undone.')) {
      this.clearChat.emit();
    }
  }
}
