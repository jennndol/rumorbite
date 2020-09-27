import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ArticlePaginationResponse } from './dto/article-pagination.response';
import { PaginationParam } from 'src/common/dto/pagination.param';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Mutation(() => Article)
  createArticle(@Args('input') createArticleInput: CreateArticleInput, @CurrentUser() currentUser: User) {
    return this.articlesService.create(createArticleInput, currentUser);
  }

  @Query(() => ArticlePaginationResponse, { name: 'articles' })
  findAll(@Args('param') paginationParam: PaginationParam): Promise<ArticlePaginationResponse> {
    return this.articlesService.findAll(paginationParam);
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(@Args('input') updateArticleInput: UpdateArticleInput) {
    return this.articlesService.update(updateArticleInput.id, updateArticleInput);
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.remove(id);
  }
}
