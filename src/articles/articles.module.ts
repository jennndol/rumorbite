import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
