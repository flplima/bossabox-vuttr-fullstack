import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ToolsModule } from './tools/tools.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [DbModule, ToolsModule, TagsModule],
})
export class AppModule {}
