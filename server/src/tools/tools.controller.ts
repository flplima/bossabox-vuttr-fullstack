import { Controller, Get, Query, Post, Body, Delete, Param, HttpCode } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolDto } from './dtos/tool.dto';

@Controller('tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  find(
    @Query('tag') tag?: string,
  ) {
    if (tag) {
      return this.toolsService.findByTagName(tag);
    }
    return this.toolsService.findAll();
  }

  @Post()
  create(
    @Body() data: ToolDto,
  ) {
    return this.toolsService.create(data);
  }

  @Delete(':toolId')
  @HttpCode(204)
  remove(
    @Param('toolId') toolId: string,
  ) {
    return this.toolsService.remove(toolId);
  }
}
