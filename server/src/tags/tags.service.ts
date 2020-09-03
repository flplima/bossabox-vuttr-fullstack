import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from 'src/db/entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async find() {
    return this.tagsRepository.find();
  }

  async findOneOrCreate(tagName: string) {
    const tag = await this.tagsRepository.findOne({ name: tagName });
    if (tag) {
      return tag;
    }
    const newTag = this.tagsRepository.create({ name: tagName });
    return this.tagsRepository.save(newTag);
  }
}
