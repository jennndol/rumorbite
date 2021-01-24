import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResponse {
  @Field(() => String, { description: 'Token field' })
  token: string;
}
