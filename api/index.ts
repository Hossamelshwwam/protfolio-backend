import 'dotenv/config';
import createApp from '../src/app';
import connectDB from '../src/config/db';

const app = createApp();

// Initialize DB connection (this might be called multiple times in serverless, 
// so connectDB should handle existing connections gracefully if possible)
connectDB();

export default app;
