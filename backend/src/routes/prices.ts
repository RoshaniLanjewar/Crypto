import { Router } from 'express';
import Price from '../models/Price';

const router = Router();

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
