import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'Name field' })
  name: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Password field' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'Email field' })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Username field' })
  username: string;
}