import { Request, RequestHandler } from 'express';

import { UserService } from '@/services/user.service';

const userService = new UserService();

export type RequestWithUser = Request & { user?: { id: number } };

export const checkUser: RequestHandler = async (req: RequestWithUser, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).send({ error: { message: 'No token present' } });
    }

    const accessTokenPayload = userService.verifyToken(token);

    if (!accessTokenPayload) {
      return res.status(401).send({ error: { message: 'Wrong token' } });
    }

    req.user = accessTokenPayload;

    return next();
  } catch (e: unknown) {
    console.log((e as Error).message);
    return res.status(401).send({ error: { message: 'Token is not valid' } });
  }
};
