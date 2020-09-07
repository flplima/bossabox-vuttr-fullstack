import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TagsService } from 'src/tags/tags.service';
import { Tool } from 'src/db/entities/tool.entity';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dtos/create-tool.dto';

const toolsRepositoryMock = {
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
};

const tagsServiceMock = {
  findOneOrCreate: jest.fn(),
};

describe('ToolsService', () => {
  let toolsService: ToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsService,
        TagsService,
        {
          provide: getRepositoryToken(Tool),
          useValue: toolsRepositoryMock,
        },
      ],
    })
      .overrideProvider(TagsService)
      .useValue(tagsServiceMock)
      .compile();

    toolsService = module.get<ToolsService>(ToolsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ToolsService.find', () => {
    it('should be return all tools', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.find({}, fakeUserId);
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'tool',
      );
      expect(
        queryBuilderMock.where,
      ).toHaveBeenCalledWith('tool.userId = :userId', { userId: fakeUserId });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
        'tool.tags',
        'tags',
      );
      expect(queryBuilderMock.innerJoin).not.toHaveBeenCalled();
      expect(queryBuilderMock.getMany).toHaveBeenCalled();
      expect(result).toBe(fakeTools);
    });

    it('should be return tools filtered by tag name', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.find({ tag: 'testing' }, fakeUserId);
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'tool',
      );
      expect(
        queryBuilderMock.where,
      ).toHaveBeenCalledWith('tool.userId = :userId', { userId: fakeUserId });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
        'tool.tags',
        'tags',
      );
      expect(queryBuilderMock.innerJoin).toHaveBeenCalledWith(
        'tool.tags',
        'tag',
      );
      expect(queryBuilderMock.where).toHaveBeenCalledWith(
        `LOWER(tag.name) = LOWER(:tag)`,
        {
          tag: 'testing',
        },
      );
      expect(queryBuilderMock.getMany).toHaveBeenCalled();
      expect(result).toBe(fakeTools);
    });
  });

  describe('ToolsService.search', () => {
    it('should be return tools filtered by search', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.search(
        { searchQuery: 'testing' },
        fakeUserId,
      );
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'tool',
      );
      expect(
        queryBuilderMock.where,
      ).toHaveBeenCalledWith('tool.userId = :userId', { userId: fakeUserId });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
        'tool.tags',
        'tags',
      );
      expect(queryBuilderMock.innerJoin).toHaveBeenCalledWith(
        'tool.tags',
        'tag',
      );
      expect(
        queryBuilderMock.where,
      ).toHaveBeenCalledWith(
        `LOWER(tag.name) LIKE '%' || LOWER(:search) || '%'`,
        { search: 'testing' },
      );
      expect(
        queryBuilderMock.orWhere,
      ).toHaveBeenCalledWith(
        `LOWER(tool.title) LIKE '%' || LOWER(:search) || '%'`,
        { search: 'testing' },
      );
      expect(
        queryBuilderMock.orWhere,
      ).toHaveBeenCalledWith(
        `LOWER(tool.link) LIKE '%' || LOWER(:search) || '%'`,
        { search: 'testing' },
      );
      expect(
        queryBuilderMock.orWhere,
      ).toHaveBeenCalledWith(
        `LOWER(tool.description) LIKE '%' || LOWER(:search) || '%'`,
        { search: 'testing' },
      );
      expect(queryBuilderMock.getMany).toHaveBeenCalled();
      expect(result).toBe(fakeTools);
    });

    it('should be return tools filtered by search in tags only', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.search(
        {
          searchQuery: 'testing',
          tagsOnly: true,
        },
        fakeUserId,
      );
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'tool',
      );
      expect(
        queryBuilderMock.where,
      ).toHaveBeenCalledWith('tool.userId = :userId', { userId: fakeUserId });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
        'tool.tags',
        'tags',
      );
      expect(queryBuilderMock.innerJoin).toHaveBeenCalledWith(
        'tool.tags',
        'tag',
      );
      expect(
        queryBuilderMock.where,
      ).toHaveBeenCalledWith(
        `LOWER(tag.name) LIKE '%' || LOWER(:search) || '%'`,
        { search: 'testing' },
      );
      expect(queryBuilderMock.orWhere).not.toHaveBeenCalled();
      expect(queryBuilderMock.getMany).toHaveBeenCalled();
      expect(result).toBe(fakeTools);
    });
  });

  describe('ToolsService.create', () => {
    it('should be create a tool', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeData: CreateToolDto = {
        title: 'Test',
        link: 'http://example.com/',
        description: 'Just a test',
        tags: ['test'],
      };
      const fakeTool = new Tool();
      toolsRepositoryMock.save.mockReturnValue(fakeTool);
      const result = await toolsService.create(fakeData, fakeUserId);
      expect(tagsServiceMock.findOneOrCreate).toHaveBeenCalledWith(
        fakeData.tags[0],
        fakeUserId,
      );
      expect(toolsRepositoryMock.create).toHaveBeenCalled();
      expect(toolsRepositoryMock.save).toHaveBeenCalled();
      expect(result).toBe(fakeTool);
    });
  });

  describe('ToolsService.remove', () => {
    it('should be delete a tool by id', async () => {
      const fakeUserId = 'fakeUserId';
      const fakeToolId = '12345';
      await toolsService.remove(fakeToolId, fakeUserId);
      expect(toolsRepositoryMock.delete).toHaveBeenCalledWith({
        id: fakeToolId,
        userId: fakeUserId,
      });
    });
  });
});
