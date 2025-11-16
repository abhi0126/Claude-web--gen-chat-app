// Load environment variables FIRST - before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import chatRoutes from './routes/chat.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/chat', chatRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Chat Application Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/chat/health',
      message: '/api/chat/message?message=<your message>'
    }
  });
});

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Server started successfully!');
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌍 Server URL: http://localhost:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (!process.env.GEMINI_API_KEY) {
    console.log('');
    console.log('⚠️  WARNING: GEMINI_API_KEY not configured!');
    console.log('📝 Please create a .env file with your Gemini API key');
    console.log('💡 See .env.example for reference');
    console.log('');
  } else {
    console.log('✓ Gemini API key configured');
    console.log('');
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
