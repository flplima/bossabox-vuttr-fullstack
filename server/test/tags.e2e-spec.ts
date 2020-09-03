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
    await app.init();
  });

  describe('GET /tags', () => {
    it('should be return all tags', async () => {
      const fakeTags = [new Tag()];
      tagsServiceMock.find.mockReturnValue(fakeTags);
      const response = await request(app.getHttpServer()).get('/tags');
      expect(tagsServiceMock.find).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakeTags);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
