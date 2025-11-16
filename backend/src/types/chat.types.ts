export interface ChatRequest {
  message: string;
}

export interface MessageChunk {
  type: 'start' | 'chunk' | 'done' | 'error';
  content?: string;
  messageId?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  geminiConnected: boolean;
}
