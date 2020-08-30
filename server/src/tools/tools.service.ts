import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tool } from 'src/db/entities/tool.entity';
import { TagsService } from 'src/tags/tags.service';
import { ToolDto } from './dtos/tool.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool) private toolsRepository: Repository<Tool>,
    private tagsService: TagsService,
  ) {}

  findAll() {
    return this.toolsRepository.find();
  }

  findByTagName(tagName: string) {
    return this.toolsRepository
      .createQueryBuilder('tool')
      .innerJoin('tool.tags', 'tag', 'tag.name = :tagName', { tagName })
      .getMany();
  }

  async create(data: ToolDto) {
    const tags = await Promise.all(
      data.tags.map(tagName => this.tagsService.findOneOrCreate(tagName)),
    );
    const tool = this.toolsRepository.create({
      ...data,
      tags,
    });
    return this.toolsRepository.save(tool);
  }

  remove(toolId: string) {
    return this.toolsRepository.delete(toolId);
  }
}
