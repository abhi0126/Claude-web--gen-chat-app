import { Component, Input, OnChanges, SimpleChanges, signal, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { CodeBlockComponent } from '../code-block/code-block.component';

interface ParsedContent {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  template: `
    <div class="markdown-content">
      @for (block of parsedContent(); track $index) {
        @if (block.type === 'code') {
          <app-code-block
            [code]="block.content"
            [language]="block.language || 'plaintext'"
          />
        } @else {
          <div [innerHTML]="sanitizeHtml(block.content)"></div>
        }
      }
    </div>
  `,
  styles: [`
    .markdown-content {
      line-height: 1.6;
      color: var(--text-primary);
    }

    .markdown-content :deep(p) {
      margin: 0.75rem 0;
    }

    .markdown-content :deep(h1),
    .markdown-content :deep(h2),
    .markdown-content :deep(h3),
    .markdown-content :deep(h4) {
      margin: 1.5rem 0 0.75rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .markdown-content :deep(h1) {
      font-size: 1.5rem;
    }

    .markdown-content :deep(h2) {
      font-size: 1.25rem;
    }

    .markdown-content :deep(h3) {
      font-size: 1.125rem;
    }

    .markdown-content :deep(ul),
    .markdown-content :deep(ol) {
      margin: 0.75rem 0;
      padding-left: 1.5rem;
    }

    .markdown-content :deep(li) {
      margin: 0.25rem 0;
    }

    .markdown-content :deep(code) {
      background-color: var(--code-bg);
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 0.875em;
      color: var(--text-primary);
    }

    .markdown-content :deep(blockquote) {
      border-left: 3px solid var(--accent-primary);
      padding-left: 1rem;
      margin: 1rem 0;
      color: var(--text-secondary);
      font-style: italic;
    }

    .markdown-content :deep(a) {
      color: var(--accent-primary);
      text-decoration: none;
    }

    .markdown-content :deep(a:hover) {
      text-decoration: underline;
    }

    .markdown-content :deep(table) {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }

    .markdown-content :deep(th),
    .markdown-content :deep(td) {
      border: 1px solid var(--border-color);
      padding: 0.5rem;
      text-align: left;
    }

    .markdown-content :deep(th) {
      background-color: var(--bg-secondary);
      font-weight: 600;
    }

    .markdown-content :deep(hr) {
      border: none;
      border-top: 1px solid var(--border-color);
      margin: 1.5rem 0;
    }

    .markdown-content :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1rem 0;
    }
  `]
})
export class MarkdownRendererComponent implements OnChanges {
  @Input() content: string = '';

  parsedContent = signal<ParsedContent[]>([]);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.parseContent();
    }
  }

  private parseContent(): void {
    if (!this.content) {
      this.parsedContent.set([]);
      return;
    }

    const blocks: ParsedContent[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(this.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textContent = this.content.substring(lastIndex, match.index);
        if (textContent.trim()) {
          blocks.push({
            type: 'text',
            content: this.parseMarkdown(textContent)
          });
        }
      }

      // Add code block
      blocks.push({
        type: 'code',
        content: match[2].trim(),
        language: match[1] || 'plaintext'
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < this.content.length) {
      const textContent = this.content.substring(lastIndex);
      if (textContent.trim()) {
        blocks.push({
          type: 'text',
          content: this.parseMarkdown(textContent)
        });
      }
    }

    this.parsedContent.set(blocks);
  }

  private parseMarkdown(text: string): string {
    try {
      const html = marked.parse(text, { async: false }) as string;
      return DOMPurify.sanitize(html);
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return text;
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }
}
