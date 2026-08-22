// GlobeTrotter Backend Server
// Express.js REST API Server with Persistent Local Database

import express from 'express';
import cors from 'cors';
import { seedDatabase } from './database/seed.js';

import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import cityRoutes from './routes/cityRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[API] ${new Date().toLocaleTimeString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Auto-seed database on server start
seedDatabase();

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/cities', cityRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: 'connected (local JSON-backed DB)',
    timestamp: new Date().toISOString(),
    service: 'GlobeTrotter REST API'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 GlobeTrotter Backend Server Running on Port ${PORT}`);
  console.log(`📦 Local Database Path: ./server/database/globetrotter-db.json`);
  console.log(`🌐 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
