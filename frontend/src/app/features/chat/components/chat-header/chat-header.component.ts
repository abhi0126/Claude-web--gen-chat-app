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
          <h1 class="app-title">
            <span class="logo-icon">✨</span>
            AI Chat Assistant
          </h1>
        </div>
        <div class="header-right">
          @if (hasMessages()) {
            <button class="icon-button" (click)="onClearChat()" title="Clear chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          }
          <button class="icon-button theme-toggle" (click)="onThemeToggle()" [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
            @if (isDark()) {
              <!-- Sun icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            } @else {
              <!-- Moon icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      padding: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(10px);
      background-color: rgba(var(--bg-primary-rgb), 0.95);
    }

    .header-content {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .app-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
      transition: all 0.2s;
    }

    .icon-button:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .icon-button:active {
      transform: scale(0.95);
    }

    .theme-toggle svg {
      transition: transform 0.3s ease;
    }

    .theme-toggle:hover svg {
      transform: rotate(20deg);
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .app-title {
        font-size: 1rem;
      }

      .logo-icon {
        font-size: 1.25rem;
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
    if (confirm('Are you sure you want to clear all messages?')) {
      this.clearChat.emit();
    }
  }
}
