    import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
    import { Player } from '../graphql/player.type';
    import { PlayerService } from '../player/player.service';
    import { CreatePlayerDto } from '../player/dto/create-player.dto';
    import { UpdatePlayerDto } from '../player/dto/update-player.dto';

    @Resolver(() => Player)
    export class PlayerResolver {
    constructor(private service: PlayerService) {}

    @Query(() => [Player], { name: 'players' })
    async getPlayers() {
        return this.service.findAll();
    }

    @Query(() => Player, { name: 'player' })
    async getPlayer(@Args('id', { type: () => Int }) id: number) {
        return this.service.findOne(id);
    }

    @Query(() => Player, { name: 'playerByUsername' })
    async getPlayerByUsername(@Args('username') username: string) {
        return this.service.findByUsername(username);
    }

    @Mutation(() => Player)
    async createPlayer(@Args('input') input: CreatePlayerDto) {
        return this.service.create(input);
    }

    @Mutation(() => Player)
    async updatePlayer(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdatePlayerDto) {
        return this.service.update(id, input);
    }

    @Mutation(() => Player)
    async deletePlayer(@Args('id', { type: () => Int }) id: number) {
        return this.service.remove(id);
    }
}