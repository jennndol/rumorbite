import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { description: 'Name field' })
  name: string;

  @Field(() => String, { description: 'Password field' })
  password: string;

  @Field(() => String, { description: 'Email field' })
  email: string;
}