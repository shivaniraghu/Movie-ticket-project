import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRoutes from './routes/movies.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'IMovies API' }));
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/imovies');
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`IMovies API listening on ${port}`));
} catch (error) {
  console.error('Could not connect to MongoDB:', error.message);
  process.exit(1);
}
