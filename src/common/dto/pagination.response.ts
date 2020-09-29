import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationResponse {
  @Field(() => Int, { description: 'Count field' })
  count: number;
}
