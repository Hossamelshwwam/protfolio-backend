import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export const signToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret) as JwtPayload;
};
