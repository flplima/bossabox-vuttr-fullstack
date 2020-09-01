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

  find({ search, tagsOnly }: { search?: string; tagsOnly?: boolean }) {
    const query = this.toolsRepository.createQueryBuilder('tool');
    query.leftJoinAndSelect('tool.tags', 'tags');
    if (search) {
      query.innerJoin('tool.tags', 'tag');
      query.where('LOWER(tag.name) LIKE :search', {
        search: `%${search}%`,
      });
      if (!tagsOnly) {
        query.orWhere('LOWER(tool.title) LIKE :search', {
          search: `%${search}%`,
        });
        query.orWhere('LOWER(tool.link) LIKE :search', {
          search: `%${search}%`,
        });
        query.orWhere('LOWER(tool.description) LIKE :search', {
          search: `%${search}%`,
        });
      }
    }
    return query.getMany();
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
