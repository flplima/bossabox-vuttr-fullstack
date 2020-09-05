import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Find tags' })
  @ApiResponse({
    status: 200,
    description: 'The tags has been successfully returned.',
  })
  find() {
    return this.tagsService.find();
  }
}
