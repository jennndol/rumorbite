import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Article {
  @Field(() => Int, { description: 'Id field' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Title field' })
  @Column({length: 100 })
  title: string;

  @Field(() => String, { description: 'Description field' })
  @Column({type: 'text'})
  description: string;

  @Field(() => User, { description: 'User field' })
  @ManyToOne(
    () => User,
    (user: User) => user.articles,
    {nullable: false}
  )
  user: User;

  @Field(() => GraphQLISODateTime, { description: 'createdAt field' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', })
  createdAt: Date;
  
  @Field(() => GraphQLISODateTime, { description: 'updatedAt field' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', })
  updatedAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
