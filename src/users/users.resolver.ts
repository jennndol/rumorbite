import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaginationParam } from '../common/dto/pagination.param';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPaginationResponse } from './dto/user-pagination.response';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserPaginationResponse, { name: 'users' })
  findAll(
    @Args('param') paginationParam: PaginationParam,
  ): Promise<UserPaginationResponse> {
    return this.usersService.findAll(paginationParam);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => Boolean)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<boolean> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.usersService.remove(id);
  }

  @Mutation(() => Boolean)
  restoreUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    return this.usersService.restore(id);
  }
}
