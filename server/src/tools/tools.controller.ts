import { Controller, Get, Query, Post, Body, Delete, Param, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dtos/create-tool.dto';
import { FindToolsDto } from './dtos/find-tools.dto';

@Controller('tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'The tools has been successfully returned.' })
  find(
    @Query() { search, tagsOnly }: FindToolsDto
  ) {
    return this.toolsService.find({ search, tagsOnly });
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The tool has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Malformed body request syntax.' })
  create(
    @Body() data: CreateToolDto
  ) {
    return this.toolsService.create(data);
  }

  @Delete(':toolId')
  @HttpCode(204)
  @ApiParam({ name: 'toolId', description: 'The id (uuid) of the tool'})
  @ApiResponse({ status: 204, description: 'The tool has been successfully deleted' })
  @ApiResponse({ status: 400, description: 'The toolId must be a valid uuid' })
  remove(
    @Param('toolId', ParseUUIDPipe) toolId: string
  ) {
    return this.toolsService.remove(toolId);
  }
}
