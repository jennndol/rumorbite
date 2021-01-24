import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginationParam } from '../common/dto/pagination.param';
import { User } from '../users/entities/user.entity';
import { ArticlesService } from './articles.service';
import { ArticlePaginationResponse } from './dto/article-pagination.response';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './entities/article.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Mutation(() => Article)
  createArticle(
    @Args('input') createArticleInput: CreateArticleInput,
    @CurrentUser() currentUser: User,
  ): Promise<Article> {
    return this.articlesService.create(createArticleInput, currentUser);
  }

  @Query(() => ArticlePaginationResponse, { name: 'articles' })
  findAll(
    @Args('param') paginationParam: PaginationParam,
  ): Promise<ArticlePaginationResponse> {
    return this.articlesService.findAll(paginationParam);
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('id', { type: () => String }) id: string,
    @Args('input') updateArticleInput: UpdateArticleInput,
  ): Promise<Article> {
    return this.articlesService.update(id, updateArticleInput);
  }

  @Mutation(() => Article)
  removeArticle(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Article> {
    return this.articlesService.remove(id);
  }
}
