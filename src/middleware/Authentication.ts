/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const auth = async (req: Request, res: Response, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    const [, token] = authHeader.split(' ');

    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    try {
      const decode = jwt.verify(token, process.env.TOKEN_KEY);
      console.log(decode);
      return next();
    } catch (err) {
      return res.status(401).json({ error: ' invalid token' });
    }
  } else {
    return res.status(401).json({ error: 'token is missing' });
  }
};

export default auth;
