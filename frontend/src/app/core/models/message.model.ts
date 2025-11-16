export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  error?: string;
}

export interface MessageChunk {
  type: 'start' | 'chunk' | 'done' | 'error';
  content?: string;
  messageId?: string;
  error?: string;
}
