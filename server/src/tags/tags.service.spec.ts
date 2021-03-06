import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Tag } from 'src/db/entities/tag.entity';
import { TagsService } from './tags.service';

const tagsRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('TagsService', () => {
  let tagsService: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: tagsRepositoryMock,
        },
      ],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
  });

  describe('TagsService.find', () => {
    it('should return all tags', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTags = [new Tag()];
      tagsRepositoryMock.find.mockReturnValue(fakeTags);
      const result = await tagsService.find(fakeUserId);
      expect(tagsRepositoryMock.find).toHaveBeenCalledWith({
        userId: fakeUserId,
      });
      expect(result).toBe(fakeTags);
    });
  });

  describe('TagsService.findOneOrCreate', () => {
    it('should return the tag if the tag exists', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTagName = 'fakeTagName';
      const fakeTag = new Tag();
      tagsRepositoryMock.findOne.mockReturnValue(fakeTag);
      const result = await tagsService.findOneOrCreate(fakeTagName, fakeUserId);
      expect(tagsRepositoryMock.findOne).toHaveBeenCalledWith({
        name: fakeTagName,
        userId: fakeUserId,
      });
      expect(tagsRepositoryMock.create).not.toHaveBeenCalled();
      expect(tagsRepositoryMock.save).not.toHaveBeenCalled();
      expect(result).toBe(fakeTag);
    });

    it("should create the tag if the tag doesn't exist", async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTagName = 'fakeTagName';
      const fakeTag = new Tag();
      tagsRepositoryMock.findOne.mockReturnValue(null);
      tagsRepositoryMock.save.mockReturnValue(fakeTag);
      const result = await tagsService.findOneOrCreate(fakeTagName, fakeUserId);
      expect(tagsRepositoryMock.findOne).toHaveBeenCalledWith({
        name: fakeTagName,
        userId: fakeUserId,
      });
      expect(tagsRepositoryMock.create).toHaveBeenCalled();
      expect(tagsRepositoryMock.save).toHaveBeenCalled();
      expect(result).toBe(fakeTag);
    });
  });
});
