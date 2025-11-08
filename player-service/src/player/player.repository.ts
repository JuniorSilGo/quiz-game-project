    import { Injectable, Inject } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client'; 
    import { CreatePlayerDto } from './dto/create-player.dto';
    import { UpdatePlayerDto } from './dto/update-player.dto';
    import { PrismaService } from '../../prisma/prisma.service';

    @Injectable()
    export class PlayerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePlayerDto) {
        return this.prisma.players.create({ data: data });
    }

    async findAll() {
        return this.prisma.players.findMany({ orderBy: { id: 'asc' } });
    }

    async findById(id: number) {
        return this.prisma.players.findUnique({ where: { id } });
    }

    async findByUsername(username: string) {
        return this.prisma.players.findUnique({ where: { username } });
    }

    async update(id: number, data: UpdatePlayerDto) {
        return this.prisma.players.update({ where: { id }, data});
    }

    async remove(id: number) {
        return this.prisma.players.delete({ where: { id } });
    }

    async upsertByUsername(data: CreatePlayerDto) {
    return this.prisma.players.upsert({
    where: { username: data.username },
    update: {}, 
    create: {
      ...data,
      xp: BigInt(data.xp ?? 0),
      matchesPlayed: data.matchesPlayed ?? 0,
    },
  });
}

}