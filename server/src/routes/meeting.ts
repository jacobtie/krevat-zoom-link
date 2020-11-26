import express from 'express';
import { adminMiddleware, authMiddleware } from '../auth';
import { getLink, setLink } from '../repositories/meetingRepo';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const link = await getLink();
    if (!link) return res.sendStatus(404);
    return res.json({ link });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.post('/', adminMiddleware, async (req, res) => {
  try {
    const { link } = req.body;
    if (!link || typeof link !== 'string') return res.sendStatus(400);
    await setLink(link);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
