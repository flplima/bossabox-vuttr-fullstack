import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthUserId } from 'src/auth/auth-user-id.decorator';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('tags')
@ApiBearerAuth()
@ApiResponse({
  status: 403,
  description: 'Forbidden. Authentication is required.',
})
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Find tags' })
  @ApiResponse({
    status: 200,
    description: 'The tags has been successfully returned.',
  })
  find(@AuthUserId() userId: string) {
    return this.tagsService.find(userId);
  }
}
