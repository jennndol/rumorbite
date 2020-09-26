import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User {
  @Field(() => Int, { description: 'Id field' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Name field' })
  @Column({length: 50, nullable: false})
  name: string;

  @Field(() => String, { description: 'Email field' })
  @Column({length: 50, nullable:true, unique: true})
  email: string;

  @Field(() => String, { description: 'Password field' })
  @Column({nullable: false })
  password: string;

  @Field(() => GraphQLISODateTime, { description: 'createdAt field' })
  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP', })
  createdAt: Timestamp;
  
  @Field(() => GraphQLISODateTime, { description: 'updatedAt field' })
  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', })
  updatedAt: Timestamp;

  @BeforeInsert()
  async hashPasswordCreate() {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.HASH_SALT));
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    if(this.password) this.password = await bcrypt.hash(this.password, parseInt(process.env.HASH_SALT));
  }
}
