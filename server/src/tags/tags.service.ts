import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from 'src/db/entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async find(userId: string) {
    return this.tagsRepository.find({ userId });
  }

  async findOneOrCreate(tagName: string, userId: string) {
    const tag = await this.tagsRepository.findOne({ name: tagName, userId });
    if (tag) {
      return tag;
    }
    const newTag = this.tagsRepository.create({ name: tagName, userId });
    return this.tagsRepository.save(newTag);
  }
}
