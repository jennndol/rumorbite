import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';

import { PaginationParam } from '../common/dto/pagination.param';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPaginationResponse } from './dto/user-pagination.response';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async findAll(
    paginationParam: PaginationParam,
  ): Promise<UserPaginationResponse> {
    const {
      q = '',
      limit,
      offset,
      orderBy = 'createdAt',
      orderType = 'DESC',
    } = paginationParam;
    const [list, count] = await this.userRepository.findAndCount({
      relations: ['articles'],
      where: [
        { name: Like(`%${q}%`), deletedAt: IsNull() },
        { email: Like(`%${q}%`), deletedAt: IsNull() },
      ],
      skip: offset,
      take: limit,
      order: {
        [orderBy]: orderType,
      },
    });
    return {
      count,
      list,
    };
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(
      { id, deletedAt: IsNull() },
      { relations: ['articles'] },
    );
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<boolean> {
    try {
      await this.userRepository.update(
        { id, deletedAt: IsNull() },
        { ...updateUserInput },
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .softDelete()
        .where({ id, deletedAt: IsNull() })
        .execute();
      return true;
    } catch (e) {
      return false;
    }
  }

  async restore(id: string): Promise<boolean> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .restore()
        .where({ id })
        .execute();
      return true;
    } catch (e) {
      return false;
    }
  }

  async findByEmailOrUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [
        { username: username, deletedAt: IsNull() },
        { email: username, deletedAt: IsNull() },
      ],
    });
  }
}
