import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'Title field' })
  title: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'Description field' })
  description: string;
}
