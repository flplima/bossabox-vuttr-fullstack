import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TagsService } from 'src/tags/tags.service';
import { Tool } from 'src/db/entities/tool.entity';
import { ToolsService } from './tools.service';
import { ToolDto } from './dtos/tool.dto';

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

  describe('ToolsService.find', () => {
    it('should be return all tools', async () => {
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.find({});
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalled();
      expect(queryBuilderMock.innerJoin).not.toHaveBeenCalled();
      expect(queryBuilderMock.where).not.toHaveBeenCalled();
      expect(queryBuilderMock.orWhere).not.toHaveBeenCalled();
      expect(result).toBe(fakeTools);
    });

    it('should be return tools filtered by search', async () => {
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.find({ search: 'testing' });
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalled();
      expect(queryBuilderMock.innerJoin).toHaveBeenCalled();
      expect(queryBuilderMock.where).toHaveBeenCalled();
      expect(queryBuilderMock.orWhere).toHaveBeenCalledTimes(3);
      expect(result).toBe(fakeTools);
    });

    it('should be return tools filtered by search in tags only', async () => {
      const fakeTools = [new Tool()];
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(fakeTools),
      };
      toolsRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await toolsService.find({
        search: 'testing',
        tagsOnly: true,
      });
      expect(toolsRepositoryMock.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalled();
      expect(queryBuilderMock.innerJoin).toHaveBeenCalled();
      expect(queryBuilderMock.where).toHaveBeenCalled();
      expect(queryBuilderMock.orWhere).not.toHaveBeenCalled();
      expect(result).toBe(fakeTools);
    });
  });

  describe('ToolsService.create', () => {
    it('should be create a tool', async () => {
      const fakeData: ToolDto = {
        title: 'Test',
        link: 'http://example.com/',
        description: 'Just a test',
        tags: ['test'],
      };
      const fakeTool = new Tool();
      toolsRepositoryMock.save.mockReturnValue(fakeTool);
      const result = await toolsService.create(fakeData);
      expect(tagsServiceMock.findOneOrCreate).toHaveBeenCalledWith(
        fakeData.tags[0],
      );
      expect(toolsRepositoryMock.create).toHaveBeenCalled();
      expect(toolsRepositoryMock.save).toHaveBeenCalled();
      expect(result).toBe(fakeTool);
    });
  });

  describe('ToolsService.remove', () => {
    it('should be delete a tool by id', async () => {
      const fakeToolId = '12345';
      await toolsService.remove(fakeToolId);
      expect(toolsRepositoryMock.delete).toHaveBeenCalledWith(fakeToolId);
    });
  });
});
