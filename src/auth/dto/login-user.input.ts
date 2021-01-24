import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'Username field' })
  username: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Password field' })
  password: string;
}
