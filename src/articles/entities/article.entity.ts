import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Article {
  @Field(() => String, { description: 'Id field' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Title field' })
  @Column({ length: 100 })
  title: string;

  @Field(() => String, { description: 'Description field' })
  @Column({ type: 'text' })
  description: string;

  @Field(() => User, { description: 'User field' })
  @ManyToOne(() => User, (user: User) => user.articles, { nullable: false })
  user: User;

  @Field(() => GraphQLISODateTime, { description: 'createdAt field' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'updatedAt field' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
