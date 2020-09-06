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
} from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dtos/create-tool.dto';

@Controller('tools')
@ApiTags('tools')
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
  find(@Query('tag') tag?: string) {
    return this.toolsService.find({ tag });
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
  ) {
    return this.toolsService.search({ searchQuery, tagsOnly });
  }

  @Post()
  @ApiOperation({ summary: 'Create a tool' })
  @ApiResponse({
    status: 201,
    description: 'The tool has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Malformed body request syntax.' })
  create(@Body() data: CreateToolDto) {
    return this.toolsService.create(data);
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
  remove(@Param('toolId', ParseUUIDPipe) toolId: string) {
    return this.toolsService.remove(toolId);
  }
}
