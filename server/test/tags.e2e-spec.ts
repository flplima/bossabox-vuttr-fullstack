import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TagsModule } from 'src/tags/tags.module';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/db/entities/tag.entity';

const tagsServiceMock = {
  find: jest.fn(),
};

const authMock = jest.fn();

describe('Tags', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TagsModule],
    })
      .overrideProvider(getRepositoryToken(Tag))
      .useValue({})
      .overrideProvider(TagsService)
      .useValue(tagsServiceMock)
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

  describe('GET /tags', () => {
    describe('when token is provided', () => {
      it('should return all tags from this user', async () => {
        const fakeUserId = 'fakeUserId';
        const fakeTags = [new Tag()];
        authMock.mockReturnValueOnce({ userId: fakeUserId });
        tagsServiceMock.find.mockReturnValue(fakeTags);
        const response = await request(app.getHttpServer()).get('/tags');
        expect(tagsServiceMock.find).toHaveBeenCalledWith(fakeUserId);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeTags);
      });
    });

    describe('when token is not provided', () => {
      it('should return 403 Forbidden Exception', async () => {
        const response = await request(app.getHttpServer()).get('/tags');
        expect(response.status).toBe(403);
        expect(tagsServiceMock.find).not.toHaveBeenCalled();
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
