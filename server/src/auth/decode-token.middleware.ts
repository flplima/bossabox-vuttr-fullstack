import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { TokenService } from './token.service';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}

  async use(req: Request & { auth: object }, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization && authorization.split('Bearer ')[1];
    if (!token || Array.isArray(token)) {
      return next();
    }
    req.auth = await this.tokenService.verify(token);
    next();
  }
}
