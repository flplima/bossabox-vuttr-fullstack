import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tool } from 'src/db/entities/tool.entity';
import { TagsService } from 'src/tags/tags.service';
import { CreateToolDto } from './dtos/create-tool.dto';

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
      query
        .innerJoin('tool.tags', 'tag')
        .where(`LOWER(tag.name) LIKE '%' || LOWER(:search) || '%'`, {
          search,
        });
    }
    if (search && !tagsOnly) {
      query
        .orWhere(`LOWER(tool.title) LIKE '%' || LOWER(:search) || '%'`, {
          search,
        })
        .orWhere(`LOWER(tool.link) LIKE '%' || LOWER(:search) || '%'`, {
          search,
        })
        .orWhere(`LOWER(tool.description) LIKE '%' || LOWER(:search) || '%'`, {
          search,
        });
    }
    return query.getMany();
  }

  async create(data: CreateToolDto) {
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
