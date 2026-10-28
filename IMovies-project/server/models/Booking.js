import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: Date, required: true },
  cinema: { type: String, required: true },
  seats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });
bookingSchema.index({ movie: 1, showtime: 1, cinema: 1, seats: 1 });
export default mongoose.model('Booking', bookingSchema);
