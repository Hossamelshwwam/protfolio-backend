import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  // 1. Connect to Database
  await connectDB();

  // 2. Start Express Server
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📡 Health:      http://localhost:${PORT}/health`);
    console.log(`📖 API Docs:    http://localhost:${PORT}/api-docs\n`);
  });
};

startServer().catch((err) => {
  console.error("❌ Server failed to start:", err);
  process.exit(1);
});
