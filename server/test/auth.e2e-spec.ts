import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/db/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

const authServiceMock = {
  login: jest.fn(),
  register: jest.fn(),
};

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({})
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /login', () => {
    it('should call login with e-mail and password', async () => {
      const data: LoginUserDto = {
        email: 'email',
        password: 'password',
      };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(data);
      expect(authServiceMock.login).toHaveBeenCalledWith(
        data.email,
        data.password,
      );
      expect(response.status).toBe(200);
    });
  });

  describe('POST /register', () => {
    it('should call register with body data', async () => {
      const data: CreateUserDto = {
        name: 'name',
        email: 'email',
        password: 'password',
      };
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(data);
      expect(authServiceMock.register).toHaveBeenCalledWith(data);
      expect(response.status).toBe(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
