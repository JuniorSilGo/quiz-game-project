  import { Injectable, NotFoundException } from '@nestjs/common';
  import { PlayerRepository } from './player.repository';
  import { CreatePlayerDto } from './dto/create-player.dto';
  import { UpdatePlayerDto } from './dto/update-player.dto'
  import { Player } from './player.entity';
  
  @Injectable()
  export class PlayerService {
  constructor(private repo: PlayerRepository) {}

  private mapToEntity(model: any): Player {
      const p = new Player();
      p.id = model.id;
      p.username = model.username;
      p.email = model.email;
      p.avatar = model.avatar;
      p.level = model.level;
      p.xp = model.xp !== undefined && model.xp !== null ? model.xp.toString() : '0';
      p.wins = model.wins;
      p.matchesPlayed = model.matches_played ?? model.matchesPlayed ?? 0;
      p.createdAt = model.created_at ?? model.createdAt;
      p.updatedAt = model.updated_at ?? model.updatedAt;
      return p;
  }

  async create(dto: CreatePlayerDto) {
    const model = await this.repo.create(dto);
    return this.mapToEntity(model);
  }

  async findAll() {
    const models = await this.repo.findAll();
    return models.map((m) => this.mapToEntity(m));
  }

  async findOne(id: number) {
    const model = await this.repo.findById(id);
    if (!model) throw new NotFoundException(`Player with id ${id} not found`);
    return this.mapToEntity(model);
  }

  async findByUsername(username: string) {
    const model = await this.repo.findByUsername(username);
    if (!model) throw new NotFoundException(`Player with username ${username} not found`);
    return this.mapToEntity(model);
  }

  async update(id: number, dto: UpdatePlayerDto) {
    await this.findOne(id); 
    const model = await this.repo.update(id, dto);
    return this.mapToEntity(model);
  }

  async remove(id: number) {
    await this.findOne(id);
    const model = await this.repo.remove(id);
    return this.mapToEntity(model);
  }

  async upsert(dto: CreatePlayerDto) {
    const model = await this.repo.upsertByUsername(dto);
    return this.mapToEntity(model);
  }
}