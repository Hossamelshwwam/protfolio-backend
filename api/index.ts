import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";
import connectDB from "../src/config/db";
import mongoose from "mongoose";

let isConnected = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Connect to DB if not already connected
  if (!isConnected || mongoose.connection.readyState !== 1) {
    await connectDB();
    isConnected = true;
  }

  // Delegate the request to the Express app
  return app(req, res);
}
