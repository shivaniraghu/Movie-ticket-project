import { Router } from 'express';
import Movie from '../models/Movie.js';
const router = Router();
router.get('/', async (req, res) => {
  try {
    const filter = req.query.search ? { title: { $regex: req.query.search, $options: 'i' } } : {};
    res.json(await Movie.find(filter).sort({ createdAt: -1 }));
  } catch { res.status(500).json({ message: 'Could not fetch movies' }); }
});
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch { res.status(400).json({ message: 'Invalid movie id' }); }
});
export default router;
