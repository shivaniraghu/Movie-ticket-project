import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = Router();
const makeToken = user => jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'development_only_change_me', { expiresIn: '2h' });
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: 'Name, email and password (8+ characters) are required' });
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: 'Email is already registered' });
    const user = await User.create({ name, email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: makeToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch { res.status(500).json({ message: 'Could not create account' }); }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: String(req.body.email || '').toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: makeToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch { res.status(500).json({ message: 'Could not log in' }); }
});
export default router;
