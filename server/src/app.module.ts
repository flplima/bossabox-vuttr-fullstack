import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { ToolsModule } from './tools/tools.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DecodeTokenMiddleware } from './auth/decode-token.middleware';

@Module({
  imports: [DbModule, AuthModule, ToolsModule, TagsModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeTokenMiddleware).forRoutes('*');
  }
}
