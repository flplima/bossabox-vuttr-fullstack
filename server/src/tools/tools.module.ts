import { Module } from '@nestjs/common';

import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from 'src/db/entities/tool.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tool]), TagsModule],
  providers: [ToolsService],
  controllers: [ToolsController],
})
export class ToolsModule {}
