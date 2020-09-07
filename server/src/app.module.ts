import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ToolsModule } from './tools/tools.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DbModule, ToolsModule, TagsModule, UsersModule],
})
export class AppModule {}
