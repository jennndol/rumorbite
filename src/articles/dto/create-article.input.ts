import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field(() => String, { description: 'Title field' })
  title: string;

  @Field(() => String, { description: 'Description field' })
  description: string;
}