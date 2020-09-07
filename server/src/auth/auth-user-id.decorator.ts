import {
  createParamDecorator,
  ForbiddenException,
  ExecutionContext,
} from '@nestjs/common';

export const AuthUserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  if (!req.auth) {
    throw new ForbiddenException(`Auth not found`);
  }
  return req.auth.userId;
});
