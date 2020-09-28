import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParam } from 'src/common/dto/pagination.param';
import { IsNull, Like, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPaginationResponse } from './dto/user-pagination.response';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user); 
  }

  async findAll(paginationParam: PaginationParam): Promise <UserPaginationResponse> {
    const { q = '', limit, offset, orderBy='createdAt', orderType='DESC' } = paginationParam
    const [list, count] = await this.userRepository.findAndCount({
      relations: ['articles'],
      where: [{ name: Like(`%${q}%`), deletedAt: IsNull()}, { email: Like(`%${q}%`), deletedAt: IsNull()}],
      skip: offset,
      take: limit,
      order: {
        [orderBy]: orderType
      },
    });
    return {
      count,
      list
    }
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({id, deletedAt: IsNull()}, { relations: ['articles'] });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    for (const key in updateUserInput) {
      if (Object.prototype.hasOwnProperty.call(updateUserInput, key)) {
        user[key] = updateUserInput[key];
      }
    }
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.deletedAt = new Date();
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User|null>{
    return await this.userRepository.findOne({email, deletedAt: IsNull()});
  }
}
