import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';

import { PaginationParam } from '../common/dto/pagination.param';
import { User } from '../users/entities/user.entity';
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
    this.articleRepository.create({
      ...createArticleInput,
      user: currentUser,
    });
    return await this.articleRepository.save(
      this.articleRepository.create({
        ...createArticleInput,
        user: currentUser,
      }),
    );
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
    await this.articleRepository.update(
      { id, deletedAt: IsNull() },
      { ...updateArticleInput },
    );
    return await this.findOne(id);
  }

  async remove(id: string): Promise<Article> {
    const article = await this.findOne(id);
    await this.articleRepository.softDelete(id);
    return article;
  }

  async restore(id: string): Promise<Article> {
    await this.articleRepository.restore(id);
    return await this.findOne(id);
  }
}
