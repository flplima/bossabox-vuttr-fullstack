import { Injectable, ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  verify(token: string) {
    return new Promise<any>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          reject(new ForbiddenException('Error decoding token'));
        } else {
          resolve(decoded);
        }
      });
    });
  }

  generate(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_KEY);
  }
}
