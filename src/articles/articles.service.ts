import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParam } from 'src/common/dto/pagination.param';
import { User } from 'src/users/entities/user.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { ArticlePaginationResponse } from './dto/article-pagination.response';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(
    createArticleInput: CreateArticleInput,
    currentUser: User,
  ): Promise<Article> {
    const article = await this.articleRepository.create({
      ...createArticleInput,
      user: currentUser,
    });
    return this.articleRepository.save(article);
  }

  async findAll(
    paginationParam: PaginationParam,
  ): Promise<ArticlePaginationResponse> {
    const {
      q = '',
      limit,
      offset,
      orderBy = 'createdAt',
      orderType = 'DESC',
    } = paginationParam;
    const [list, count] = await this.articleRepository.findAndCount({
      relations: ['user'],
      where: [
        { title: Like(`%${q}%`), deletedAt: IsNull() },
        { description: Like(`%${q}%`), deletedAt: IsNull() },
      ],
      skip: offset,
      take: limit,
      order: {
        [orderBy]: orderType,
      },
    });
    return {
      count,
      list,
    };
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne(
      { id, deletedAt: IsNull() },
      { relations: ['user'] },
    );
    if (!article) throw new NotFoundException();
    return article;
  }

  async update(
    id: string,
    updateArticleInput: UpdateArticleInput,
  ): Promise<Article> {
    const article = await this.findOne(id);
    for (const key in updateArticleInput) {
      if (Object.prototype.hasOwnProperty.call(updateArticleInput, key)) {
        article[key] = updateArticleInput[key];
      }
    }
    return this.articleRepository.save(article);
  }

  async remove(id: string): Promise<Article> {
    const article = await this.findOne(id);
    article.deletedAt = new Date();
    return this.articleRepository.save(article);
  }
}
