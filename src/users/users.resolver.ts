import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationParam } from 'src/common/dto/pagination.param';
import { UserPaginationResponse } from './dto/user-pagination.response';
import { Req } from '@nestjs/common';
import { Request } from 'express';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') createUserInput: CreateUserInput, @Req() req: Request): Promise<User> {
    console.log(req)
    return this.usersService.create(createUserInput);
  }

  @Query(() => UserPaginationResponse, { name: 'users' })
  findAll(@Args('param') paginationParam: PaginationParam): Promise<UserPaginationResponse> {
    return this.usersService.findAll(paginationParam)
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('id', { type: () => Int }) id: number, @Args('input') updateUserInput: UpdateUserInput) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
