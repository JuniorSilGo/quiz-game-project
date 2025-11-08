import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Player {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Int)
  level: number;

  @Field(() => String) 
  xp: bigint;

  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  matchesPlayed: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
