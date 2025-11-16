import { Router, Request, Response } from 'express';
import { geminiService } from '../services/gemini.service';
import { HealthResponse } from '../types/chat.types';

const router = Router();

/**
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  const response: HealthResponse = {
    status: 'ok',
    geminiConnected: geminiService.isConfigured()
  };
  res.json(response);
});

/**
 * Stream chat message using Server-Sent Events (SSE)
 */
router.get('/message', async (req: Request, res: Response) => {
  const message = req.query.message as string;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering for nginx

  // Send initial connection confirmation
  res.write(':\n\n');

  try {
    // Stream response from Gemini
    for await (const chunk of geminiService.streamResponse(message)) {
      const data = JSON.stringify(chunk);
      res.write(`data: ${data}\n\n`);

      // End connection on done or error
      if (chunk.type === 'done' || chunk.type === 'error') {
        res.end();
        return;
      }
    }
  } catch (error) {
    console.error('Streaming error:', error);
    const errorChunk = {
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    res.write(`data: ${JSON.stringify(errorChunk)}\n\n`);
    res.end();
  }
});

export default router;
