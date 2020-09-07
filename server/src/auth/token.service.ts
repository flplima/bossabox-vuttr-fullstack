import { Injectable, ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthData } from './auth.decorator';

@Injectable()
export class TokenService {
  verify(token: string) {
    return new Promise<AuthData>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          reject(new ForbiddenException('Error decoding token'));
        } else {
          resolve(decoded as AuthData);
        }
      });
    });
  }

  generate(userId: string) {
    return jwt.sign(userId, process.env.JWT_KEY);
  }
}
