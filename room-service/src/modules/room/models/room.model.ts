import { Field, ObjectType, ID } from '@nestjs/graphql';
import { PlayerModel } from './player.model';

@ObjectType()
export class RoomModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  ownerId: string;

  @Field()
  status: string;

  @Field(() => [PlayerModel], { nullable: 'items' })
  players?: PlayerModel[];
}
