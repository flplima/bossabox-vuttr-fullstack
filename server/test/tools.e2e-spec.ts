import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ToolsModule } from 'src/tools/tools.module';
import { ToolsService } from 'src/tools/tools.service';
import { CreateToolDto } from 'src/tools/dtos/create-tool.dto';
import { Tool } from 'src/db/entities/tool.entity';
import { Tag } from 'src/db/entities/tag.entity';

const toolsServiceMock = {
  find: jest.fn(),
  search: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
};

const authMock = jest.fn();

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
    app.use((req, res, next) => {
      req.auth = authMock();
      next();
    });
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tools', () => {
    describe('when token is provided', () => {
      it('should return all tools from this user', async () => {
        const fakeUserId = 'fakeUserId';
        const fakeTools = [new Tool()];
        authMock.mockReturnValueOnce({ userId: fakeUserId });
        toolsServiceMock.find.mockReturnValue(fakeTools);
        const response = await request(app.getHttpServer()).get('/tools');
        expect(toolsServiceMock.find).toHaveBeenCalledWith({}, fakeUserId);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeTools);
      });

      it('should return tools filtered by tag name and user', async () => {
        const fakeUserId = 'fakeUserId';
        const fakeTag = 'fakeTag';
        const fakeTools = [new Tool()];
        authMock.mockReturnValueOnce({ userId: fakeUserId });
        toolsServiceMock.find.mockReturnValue(fakeTools);
        const response = await request(app.getHttpServer()).get(
          `/tools?tag=${fakeTag}`,
        );
        expect(toolsServiceMock.find).toHaveBeenCalledWith(
          { tag: fakeTag },
          fakeUserId,
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeTools);
      });
    });

    describe('when token is not provided', () => {
      it('should return HTTP 403 Forbidden Exception', async () => {
        const response = await request(app.getHttpServer()).get('/tools');
        expect(toolsServiceMock.find).not.toHaveBeenCalled();
        expect(response.status).toBe(403);
      });
    });
  });

  describe('POST /tools', () => {
    describe('when token is provided', () => {
      it('should create a tool for this user', async () => {
        const data: CreateToolDto = {
          title: 'Test',
          link: 'http://example.com/',
          description: 'Just a test',
          tags: ['test'],
        };
        const fakeUserId = 'fakeUserId';
        const fakeTool = new Tool();
        authMock.mockReturnValueOnce({ userId: fakeUserId });
        toolsServiceMock.create.mockReturnValue(fakeTool);
        const response = await request(app.getHttpServer())
          .post('/tools')
          .send(data);
        expect(toolsServiceMock.create).toHaveBeenCalledWith(data, fakeUserId);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(fakeTool);
      });
    });

    describe('when token is not provided', () => {
      it('should return HTTP 403 Forbidden Exception', async () => {
        const response = await request(app.getHttpServer())
          .post('/tools')
          .send({});
        expect(toolsServiceMock.create).not.toHaveBeenCalled();
        expect(response.status).toBe(403);
      });
    });
  });

  describe('DELETE /tools', () => {
    describe('when token is provided', () => {
      it('should remove a tool by id', async () => {
        const fakeUserId = 'fakeUserId';
        const fakeToolId = '4ccccabc-14cf-483f-882e-a8c40b340c8e';
        authMock.mockReturnValueOnce({ userId: fakeUserId });
        const response = await request(app.getHttpServer()).delete(
          `/tools/${fakeToolId}`,
        );
        expect(toolsServiceMock.remove).toHaveBeenCalledWith(
          fakeToolId,
          fakeUserId,
        );
        expect(response.status).toBe(204);
      });
    });

    describe('when token is not provided', () => {
      it('should return HTTP 403 Forbidden Exception', async () => {
        const response = await request(app.getHttpServer()).delete(
          `/tools/12345`,
        );
        expect(response.status).toBe(403);
        expect(toolsServiceMock.remove).not.toHaveBeenCalled();
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
