import { Controller, Get, Query, Post, Body, Delete, Param, HttpCode } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolDto } from './dtos/tool.dto';
import { FindToolsDto } from './dtos/find-tools.dto';

@Controller('tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  find(@Query() { search, tagsOnly }: FindToolsDto) {
    return this.toolsService.find({ search, tagsOnly });
  }

  @Post()
  create(@Body() data: ToolDto) {
    return this.toolsService.create(data);
  }

  @Delete(':toolId')
  @HttpCode(204)
  remove(@Param('toolId') toolId: string) {
    return this.toolsService.remove(toolId);
  }
}
