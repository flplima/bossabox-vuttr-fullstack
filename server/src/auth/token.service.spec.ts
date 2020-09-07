jest.mock('jsonwebtoken');

import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UsersService } from 'src/users/users.service';
import { TokenService } from './token.service';

const usersServiceMock = {
  findByEmailAndPassword: jest.fn(),
  create: jest.fn(),
};

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  describe('TokenService.verifyToken', () => {
    it('should throw HTTP 403 Forbidden Exception if token is invalid', async () => {
      const fakeToken = 'fakeToken';
      (jwt.verify as jest.Mock).mockImplementation((token, _, cb) => {
        cb(true);
      });
      try {
        await tokenService.verify(fakeToken);
        fail();
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenException);
      } finally {
        expect(jwt.verify).toHaveBeenCalled();
      }
    });

    it('should resolves with auth data if token is valid', async () => {
      const fakeToken = 'fakeToken';
      const fakeAuthData = 'fakeAuthData';
      (jwt.verify as jest.Mock).mockImplementation((token, _, cb) => {
        cb(null, fakeAuthData);
      });
      const result = await tokenService.verify(fakeToken);
      expect(jwt.verify).toHaveBeenCalled();
      expect(result).toBe(fakeAuthData);
    });
  });

  describe('TokenService.generateToken', () => {
    it('should return a token', () => {
      const fakeToken = 'fakeToken';
      const fakeUserId = 'fakeUserId';
      (jwt.sign as jest.Mock).mockReturnValue(fakeToken);
      const result = tokenService.generate(fakeUserId);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe(fakeToken);
    });
  });
});
