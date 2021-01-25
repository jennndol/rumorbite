import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResponse {
  @Field(() => String, { description: 'Id field' })
  id: string;

  @Field(() => String, { description: 'Name field' })
  name: string;

  @Field(() => String, { description: 'Token field' })
  token: string;
}
