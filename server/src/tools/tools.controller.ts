import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseBoolPipe,
} from '@nestjs/common';

import {
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthUserId } from 'src/auth/auth-user-id.decorator';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dtos/create-tool.dto';

@Controller('tools')
@ApiTags('tools')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: 'Find tools' })
  @ApiQuery({
    name: 'tag',
    type: String,
    required: false,
    description: 'Filter tools by tag name',
  })
  @ApiResponse({
    status: 200,
    description: 'The tools has been successfully returned.',
  })
  find(@AuthUserId() userId: string, @Query('tag') tag?: string) {
    return this.toolsService.find({ tag }, userId);
  }

  @Get('search/:searchQuery')
  @ApiOperation({ summary: 'Filter tools by search' })
  @ApiParam({ name: 'searchQuery' })
  @ApiQuery({
    name: 'tagsOnly',
    type: Boolean,
    required: false,
    description: 'Search in tags only',
  })
  search(
    @Param('searchQuery') searchQuery: string,
    @Query('tagsOnly', ParseBoolPipe) tagsOnly: boolean,
    @AuthUserId() userId: string,
  ) {
    return this.toolsService.search({ searchQuery, tagsOnly }, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a tool' })
  @ApiResponse({
    status: 201,
    description: 'The tool has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Malformed body request syntax.' })
  create(@Body() data: CreateToolDto, @AuthUserId() userId: string) {
    return this.toolsService.create(data, userId);
  }

  @Delete(':toolId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a tool' })
  @ApiParam({ name: 'toolId', description: 'The id (uuid) of the tool' })
  @ApiResponse({
    status: 204,
    description: 'The tool has been successfully deleted',
  })
  @ApiResponse({ status: 400, description: 'The toolId must be a valid uuid' })
  remove(
    @Param('toolId', ParseUUIDPipe) toolId: string,
    @AuthUserId() userId: string,
  ) {
    return this.toolsService.remove(toolId, userId);
  }
}
