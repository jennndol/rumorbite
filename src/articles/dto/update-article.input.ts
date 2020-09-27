import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleInput } from './create-article.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => Int)
  id: number;
}