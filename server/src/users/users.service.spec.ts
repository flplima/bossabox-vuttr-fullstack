jest.mock('bcrypt');

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from 'src/db/entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

import { compare } from 'bcrypt';

const usersRepositoryMock = {
  count: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UsersService.create', () => {
    it('should create a user if e-mail is not registered', async () => {
      const fakeUser = new User();
      usersRepositoryMock.count.mockReturnValue(0);
      usersRepositoryMock.create.mockReturnValue(fakeUser);
      usersRepositoryMock.save.mockReturnValue(fakeUser);
      const data: CreateUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: '1234',
      };
      const result = await usersService.create(data);
      expect(usersRepositoryMock.count).toHaveBeenCalledWith({
        email: data.email,
      });
      expect(usersRepositoryMock.create).toHaveBeenCalledWith(data);
      expect(usersRepositoryMock.save).toHaveBeenCalledWith(fakeUser);
      expect(result).toBe(fakeUser);
    });

    it('should throw HTTP 422 Unprocessable Entity Exception if e-mail is already registered', async () => {
      const data: CreateUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: '1234',
      };
      usersRepositoryMock.count.mockReturnValue(1);
      try {
        await usersService.create(data);
        fail();
      } catch (err) {
        expect(err).toBeInstanceOf(UnprocessableEntityException);
      } finally {
        expect(usersRepositoryMock.count).toHaveBeenCalledWith({
          email: data.email,
        });
        expect(usersRepositoryMock.create).not.toHaveBeenCalled();
        expect(usersRepositoryMock.save).not.toHaveBeenCalled();
      }
    });
  });

  describe('UsersService.findByEmailAndPassword', () => {
    describe('when user exists in database and password is correct...', () => {
      it('should return user', async () => {
        const data = {
          email: 'test@test.com',
          password: '1234',
        };
        const fakeUser = new User();
        fakeUser.passwordHash = 'fakePasswordHash';
        usersRepositoryMock.findOne.mockReturnValue(fakeUser);
        (compare as jest.Mock).mockReturnValue(true);
        const result = await usersService.findByEmailAndPassword(
          data.email,
          data.password,
        );
        expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
          email: data.email,
        });
        expect(compare).toHaveBeenCalledWith(
          data.password,
          fakeUser.passwordHash,
        );
        expect(result).toBe(fakeUser);
      });
    });

    describe('when user not exists in database...', () => {
      it('should throw HTTP 422 Unprocessable Entity Exception', async () => {
        const data = {
          email: 'test@test.com',
          password: '1234',
        };
        usersRepositoryMock.findOne.mockReturnValue(null);
        try {
          await usersService.findByEmailAndPassword(data.email, data.password);
          fail();
        } catch (err) {
          expect(err).toBeInstanceOf(UnprocessableEntityException);
        } finally {
          expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
            email: data.email,
          });
        }
      });
    });

    describe('when user exists in database and password is incorrect...', () => {
      it('should throw HTTP 401 Unauthorized Exception', async () => {
        const data = {
          email: 'test@test.com',
          password: '1234',
        };
        const fakeUser = new User();
        fakeUser.passwordHash = 'fakePasswordHash';
        usersRepositoryMock.findOne.mockReturnValue(fakeUser);
        (compare as jest.Mock).mockReturnValue(false);
        try {
          await usersService.findByEmailAndPassword(data.email, data.password);
          fail();
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
        } finally {
          expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
            email: data.email,
          });
          expect(compare).toHaveBeenCalledWith(
            data.password,
            fakeUser.passwordHash,
          );
        }
      });
    });
  });
});
