import 'dotenv/config';
import express from 'express';
import createApp from '../src/app';
import connectDB from '../src/config/db';

const app = express();

// Ensure DB is connected before any routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error in Vercel handler:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error: Database connection failed.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
});

// Use the main app logic
app.use(createApp());

export default app;
