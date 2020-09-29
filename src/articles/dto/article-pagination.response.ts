import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/common/dto/pagination.response';
import { Article } from '../entities/article.entity';

@ObjectType()
export class ArticlePaginationResponse extends PaginationResponse {
  @Field(() => [Article], { description: 'Articles field' })
  list: Article[];
}
