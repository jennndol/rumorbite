import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as typeOrmConfig from '../../ormconfig';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let module: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('users service', () => {
    it('should be defined"', () => {
      expect(usersService).toBeDefined();
    });
  });

  describe('users service findAll', () => {
    it('should be defined"', async () => {
      expect(await usersService.findAll({})).toHaveProperty('count');
      expect(await usersService.findAll({})).toHaveProperty('list');
    });
  });
});
