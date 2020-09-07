import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

const usersServiceMock = {
  findByEmailAndPassword: jest.fn(),
  create: jest.fn(),
};

const tokenServiceMock = {
  generate: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, TokenService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .overrideProvider(TokenService)
      .useValue(tokenServiceMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('AuthService.login', () => {
    it('should return user and token', async () => {
      const fakeUser = { id: 'fakeId' };
      const fakeToken = 'fakeToken';
      usersServiceMock.findByEmailAndPassword.mockReturnValue(fakeUser);
      tokenServiceMock.generate.mockReturnValue(fakeToken);
      const result = await authService.login('email', 'password');
      expect(usersServiceMock.findByEmailAndPassword).toHaveBeenCalledWith(
        'email',
        'password',
      );
      expect(tokenServiceMock.generate).toHaveBeenCalledWith(fakeUser.id);
      expect(result).toStrictEqual({ user: fakeUser, token: fakeToken });
    });
  });

  describe('AuthService.register', () => {
    it('should create a user and return user and token', async () => {
      const fakeData: CreateUserDto = {
        name: 'test',
        email: 'email@example.com',
        password: '1234',
      };
      const fakeUser = { id: 'fakeId' };
      const fakeToken = 'fakeToken';
      usersServiceMock.create.mockReturnValue(fakeUser);
      tokenServiceMock.generate.mockReturnValue(fakeToken);
      const result = await authService.register(fakeData);
      expect(usersServiceMock.create).toHaveBeenCalledWith(fakeData);
      expect(tokenServiceMock.generate).toHaveBeenCalledWith(fakeUser.id);
      expect(result).toStrictEqual({ user: fakeUser, token: fakeToken });
    });
  });
});
