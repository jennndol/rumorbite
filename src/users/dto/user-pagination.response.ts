import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationResponse } from '../../common/dto/pagination.response';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserPaginationResponse extends PaginationResponse {
  @Field(() => [User], { description: 'Users field' })
  list: User[];
}
