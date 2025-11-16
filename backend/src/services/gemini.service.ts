import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { MessageChunk } from '../types/chat.types';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private apiKeyConfigured: boolean = false;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('⚠️  GEMINI_API_KEY not found in environment variables');
      console.warn('⚠️  Please add your API key to the .env file');
      this.apiKeyConfigured = false;
      // Create dummy instances to prevent errors
      this.genAI = {} as GoogleGenerativeAI;
      this.model = {} as GenerativeModel;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      this.apiKeyConfigured = true;
      console.log('✓ Gemini API initialized successfully');
    }
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return this.apiKeyConfigured;
  }

  /**
   * Generate streaming response from Gemini
   */
  async* streamResponse(message: string): AsyncGenerator<MessageChunk> {
    if (!this.apiKeyConfigured) {
      yield {
        type: 'error',
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.'
      };
      return;
    }

    try {
      const messageId = this.generateId();

      // Send start event
      yield {
        type: 'start',
        messageId
      };

      // Stream the response
      const result = await this.model.generateContentStream(message);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield {
            type: 'chunk',
            content: text
          };
        }
      }

      // Send done event
      yield {
        type: 'done',
        messageId
      };

    } catch (error) {
      console.error('Gemini API error:', error);

      let errorMessage = 'An error occurred while generating response';

      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = 'Invalid API key. Please check your GEMINI_API_KEY in .env file.';
        } else if (error.message.includes('quota')) {
          errorMessage = 'API quota exceeded. Please check your Gemini API usage.';
        } else {
          errorMessage = error.message;
        }
      }

      yield {
        type: 'error',
        error: errorMessage
      };
    }
  }

  /**
   * Generate unique message ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
