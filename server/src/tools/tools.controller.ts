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
import { FindToolsDto } from './dtos/find-tools.dto';

@Controller('tools')
@ApiTags('tools')
@UseInterceptors(ClassSerializerInterceptor)
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: 'Find tools' })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    description: 'Search tools',
  })
  @ApiQuery({
    name: 'tagsOnly',
    type: Boolean,
    required: false,
    description: 'Search in tags only',
  })
  @ApiQuery({
    name: 'tag',
    type: String,
    required: false,
    description: 'Filter tools by tag',
  })
  @ApiResponse({
    status: 200,
    description: 'The tools has been successfully returned.',
  })
  find(@Query() { search, tagsOnly }: FindToolsDto) {
    return this.toolsService.find({ search, tagsOnly });
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
