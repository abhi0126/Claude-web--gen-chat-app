import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-block-container">
      <div class="code-block-header">
        <span class="code-language">{{ language }}</span>
        <button
          class="copy-button"
          (click)="copyCode()"
          [class.copied]="copied()"
        >
          @if (copied()) {
            <span>✓ Copied</span>
          } @else {
            <span>Copy</span>
          }
        </button>
      </div>
      <pre><code [class]="'language-' + language" [innerHTML]="highlightedCode()"></code></pre>
    </div>
  `,
  styles: [`
    .code-block-container {
      position: relative;
      margin: 1rem 0;
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--code-bg);
      border: 1px solid var(--border-color);
    }

    .code-block-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .code-language {
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: var(--text-secondary);
      text-transform: uppercase;
      font-weight: 500;
    }

    .copy-button {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      background-color: transparent;
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--font-sans);
    }

    .copy-button:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .copy-button.copied {
      color: #10b981;
      border-color: #10b981;
    }

    pre {
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
      background-color: var(--code-bg);
    }

    code {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    /* Custom scrollbar for code blocks */
    pre::-webkit-scrollbar {
      height: 8px;
    }

    pre::-webkit-scrollbar-track {
      background: transparent;
    }

    pre::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 4px;
    }
  `]
})
export class CodeBlockComponent implements OnInit {
  @Input() code: string = '';
  @Input() language: string = 'plaintext';

  highlightedCode = signal<string>('');
  copied = signal<boolean>(false);

  ngOnInit(): void {
    this.highlightCode();
  }

  private highlightCode(): void {
    try {
      const highlighted = hljs.highlight(this.code, {
        language: this.language,
        ignoreIllegals: true
      });
      this.highlightedCode.set(highlighted.value);
    } catch (error) {
      // If language not found, use auto-detection
      try {
        const highlighted = hljs.highlightAuto(this.code);
        this.highlightedCode.set(highlighted.value);
      } catch (e) {
        // Fallback to plain text
        this.highlightedCode.set(this.escapeHtml(this.code));
      }
    }
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
