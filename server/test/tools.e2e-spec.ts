import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ToolsModule } from 'src/tools/tools.module';
import { ToolsService } from 'src/tools/tools.service';
import { CreateToolDto } from 'src/tools/dtos/create-tool.dto';
import { Tool } from 'src/db/entities/tool.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tag } from 'src/db/entities/tag.entity';

const toolsServiceMock = {
  findAll: jest.fn(),
  findByTagName: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
};

describe('Tools', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ToolsModule],
    })
      .overrideProvider(getRepositoryToken(Tool))
      .useValue({})
      .overrideProvider(getRepositoryToken(Tag))
      .useValue({})
      .overrideProvider(ToolsService)
      .useValue(toolsServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /tools', () => {
    it('should be return all tools', async () => {
      const fakeTools = [new Tool()];
      toolsServiceMock.findAll.mockReturnValue(fakeTools);
      const response = await request(app.getHttpServer()).get('/tools');
      expect(toolsServiceMock.findAll).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakeTools);
    });

    it('should be return all tools by tag', async () => {
      const fakeTagName = 'tests';
      const fakeTools = [new Tool()];
      toolsServiceMock.findByTagName.mockReturnValue(fakeTools);
      const response = await request(app.getHttpServer())
        .get('/tools')
        .query({ tag: fakeTagName });
      expect(toolsServiceMock.findByTagName).toHaveBeenCalledWith(fakeTagName);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakeTools);
    });
  });

  describe('POST /tools', () => {
    it('should be create a tool', async () => {
      const data: CreateToolDto = {
        title: 'Test',
        link: 'http://example.com/',
        description: 'Just a test',
        tags: ['test'],
      };
      const fakeTool = new Tool();
      toolsServiceMock.create.mockReturnValue(fakeTool);
      const response = await request(app.getHttpServer())
        .post('/tools')
        .send(data);
      expect(toolsServiceMock.create).toHaveBeenCalledWith(data);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(fakeTool);
    });
  });

  describe('DELETE /tools', () => {
    it('should be remove a tool by id', async () => {
      const fakeToolId = '12345';
      const response = await request(app.getHttpServer()).delete(
        `/tools/${fakeToolId}`,
      );
      expect(toolsServiceMock.remove).toHaveBeenCalledWith(fakeToolId);
      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
