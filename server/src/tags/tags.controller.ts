import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The tags has been successfully returned.',
  })
  find() {
    return this.tagsService.find();
  }
}
