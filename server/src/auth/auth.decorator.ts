import { createParamDecorator, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

export interface AuthData {
  userId: string;
  iat: number;
}

export const AuthUserId = createParamDecorator(
  (_, req: Request & { auth: AuthData }) => {
    if (!req.auth) {
      throw new ForbiddenException(`Auth not found`);
    }
    return req.auth.userId;
  },
);
