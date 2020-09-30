import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name field' })
  name: string;

  @Field(() => String, { description: 'Password field' })
  password: string;

  @IsEmail()
  @Field(() => String, { description: 'Email field' })
  email: string;

  @Field(() => String, { description: 'Username field' })
  username: string;
}