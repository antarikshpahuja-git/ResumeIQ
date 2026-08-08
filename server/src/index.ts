import express from 'express';
import cors from 'cors';
import { config } from './config';
import authRoutes from './routes/auth';
import resumeRoutes from './routes/resume';
import historyRoutes from './routes/history';
import { errorHandler } from './middleware/errorHandler';
import { initDatabase } from './models/database';

const app = express();

// Middleware
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/history', historyRoutes);

// Error Handling
app.use(errorHandler);

// Start server - initialize DB first
async function start() {
  await initDatabase();
  app.listen(config.PORT, () => {
    console.log(`🚀 ResumeAI Server running on port ${config.PORT}`);
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`Client URL: ${config.CLIENT_URL}`);
    if (config.GEMINI_API_KEY) {
      console.log('✨ Gemini AI Integration: Enabled');
    } else {
      console.log('⚠️  Gemini AI Integration: Disabled (No API Key)');
    }
  });
}

start().catch(console.error);
