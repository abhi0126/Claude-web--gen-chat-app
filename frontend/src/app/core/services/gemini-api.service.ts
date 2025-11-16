import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageChunk } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class GeminiApiService {
  private readonly API_URL = environment.apiUrl;

  /**
   * Send message to backend and stream the response using SSE
   */
  streamMessage(message: string): Observable<MessageChunk> {
    return new Observable<MessageChunk>(observer => {
      const eventSource = new EventSource(
        `${this.API_URL}/chat/message?message=${encodeURIComponent(message)}`
      );

      eventSource.onmessage = (event) => {
        try {
          const chunk: MessageChunk = JSON.parse(event.data);
          observer.next(chunk);

          // Close connection when done
          if (chunk.type === 'done' || chunk.type === 'error') {
            eventSource.close();
            observer.complete();
          }
        } catch (error) {
          observer.error(error);
          eventSource.close();
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        observer.error({
          type: 'error',
          error: 'Connection to server failed. Please try again.'
        });
        eventSource.close();
      };

      // Cleanup function
      return () => {
        eventSource.close();
      };
    });
  }

  /**
   * Check backend health
   */
  async checkHealth(): Promise<{ status: string; geminiConnected: boolean }> {
    try {
      const response = await fetch(`${this.API_URL}/chat/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', geminiConnected: false };
    }
  }
}
