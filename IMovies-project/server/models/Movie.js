import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  posterUrl: { type: String, default: '' },
  genre: [{ type: String }],
  durationMinutes: { type: Number, default: 120 },
  language: { type: String, default: 'Hindi' },
  rating: { type: Number, min: 0, max: 10, default: 0 },
  releaseDate: Date
}, { timestamps: true });
export default mongoose.model('Movie', movieSchema);
