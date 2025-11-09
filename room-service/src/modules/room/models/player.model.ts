import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class PlayerModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
