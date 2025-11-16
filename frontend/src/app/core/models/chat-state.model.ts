import { Message } from './message.model';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface SendMessageRequest {
  message: string;
}

export interface SendMessageResponse {
  messageId: string;
  content: string;
}
