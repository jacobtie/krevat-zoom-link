import express from 'express';
import { createToken } from '../auth';

const router = express.Router();

const passcode = process.env.PASSCODE;
if (!passcode) throw new Error('No passcode found');

const adminPasscode = process.env.ADMIN_PASSCODE;
if (!adminPasscode) throw new Error('No admin passcode found');

router.post('/', (req, res) => {
  const { code } = req.body;
  let token: string;
  let isAdmin: boolean;
  if (code === passcode) {
    token = createToken(false);
    isAdmin = false;
  } else if (code === adminPasscode) {
    token = createToken(true);
    isAdmin = true;
  } else {
    return res.sendStatus(401);
  }

  return res.json({ token, isAdmin });
});

export default router;
