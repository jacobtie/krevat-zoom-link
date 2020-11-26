import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('No JWT secret set');
}

interface Claims {
  isAdmin: boolean;
}

export const createToken = (isAdmin: boolean): string => {
  const token = jwt.sign({ isAdmin }, secret);
  return token;
};

const verifyToken = (token: string): Claims | null => {
  try {
    const decodedToken = jwt.verify(token, secret);
    if (typeof decodedToken === 'object') {
      const tokenClaims = decodedToken as Claims;
      if (tokenClaims.isAdmin == null) return null;
      return { isAdmin: tokenClaims.isAdmin };
    }
    return null;
  } catch (err) {
    return null;
  }
};

const getTokenClaims = (req: Request): Claims | null => {
  const bearerString = req.headers.authorization;
  if (!bearerString) return null;
  const token = bearerString.split('Bearer ')[1];
  if (!token) return null;
  return verifyToken(token);
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const claims = getTokenClaims(req);
  if (!claims) return res.sendStatus(403);
  return next();
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const claims = getTokenClaims(req);
  if (!claims?.isAdmin) return res.sendStatus(403);
  return next();
};
