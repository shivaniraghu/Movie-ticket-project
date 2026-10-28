import { Router } from 'express';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import auth from '../middleware/auth.js';
const router = Router();
router.get('/mine', auth, async (req, res) => {
  try { res.json(await Booking.find({ user: req.user.id }).populate('movie').sort({ createdAt: -1 })); }
  catch { res.status(500).json({ message: 'Could not fetch bookings' }); }
});
router.post('/', auth, async (req, res) => {
  try {
    const { movieId, showtime, cinema, seats, totalAmount } = req.body;
    if (!movieId || !showtime || !cinema || !Array.isArray(seats) || !seats.length || !Number.isFinite(totalAmount)) return res.status(400).json({ message: 'Movie, showtime, cinema, seats and total are required' });
    if (new Set(seats).size !== seats.length) return res.status(400).json({ message: 'Duplicate seats are not allowed' });
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    // For production, enforce seat uniqueness atomically using a showtime-seat collection/transaction.
    const booking = await Booking.create({ user: req.user.id, movie: movieId, showtime: new Date(showtime), cinema, seats, totalAmount });
    res.status(201).json(await booking.populate('movie'));
  } catch { res.status(500).json({ message: 'Could not create booking' }); }
});
export default router;
