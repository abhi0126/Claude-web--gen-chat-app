import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatStateService } from '../../../core/services/chat-state.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ChatHeaderComponent } from '../components/chat-header/chat-header.component';
import { MessageListComponent } from '../components/message-list/message-list.component';
import { ChatInputComponent } from '../components/chat-input/chat-input.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    MessageListComponent,
    ChatInputComponent
  ],
  template: `
    <div class="chat-page">
      <app-chat-header
        [isDark]="isDark"
        [hasMessages]="chatState.hasMessages"
        (themeToggle)="handleThemeToggle()"
        (clearChat)="handleClearChat()"
      />
      <app-message-list [messages]="chatState.allMessages" />
      <app-chat-input
        [isDisabled]="chatState.loading"
        (messageSent)="handleMessageSent($event)"
      />
    </div>
  `,
  styles: [`
    .chat-page {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
      background-color: var(--bg-primary);
    }

    /* Ensure proper layout */
    :host {
      display: block;
      height: 100vh;
      width: 100%;
    }
  `]
})
export class ChatPageComponent {
  // Computed signal to check if dark mode is active
  isDark = computed(() => this.themeService.currentTheme() === 'dark');

  constructor(
    public chatState: ChatStateService,
    private themeService: ThemeService
  ) {}

  handleMessageSent(message: string): void {
    this.chatState.sendMessage(message);
  }

  handleThemeToggle(): void {
    this.themeService.toggleTheme();
  }

  handleClearChat(): void {
    this.chatState.clearMessages();
  }
}
