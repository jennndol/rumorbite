import { ObjectType, Field } from '@nestjs/graphql';
import { PaginationResponse } from 'src/common/dto/pagination.response';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserPaginationResponse extends PaginationResponse {
  @Field(() => [User], { description: 'Users field' })
  list: User[];
}
