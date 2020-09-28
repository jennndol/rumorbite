import { CreateArticleInput } from './create-article.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {}
