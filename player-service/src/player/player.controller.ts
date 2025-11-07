  import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    ParseIntPipe,
  } from '@nestjs/common';
  import { PlayerService } from './player.service';
  import { CreatePlayerDto } from './dto/create-player.dto';
  import { UpdatePlayerDto } from './dto/update-player.dto';

  @Controller('players')
  export class PlayerController {
  constructor(private service: PlayerService) {}

  @Get()
  async findAll() {
      return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreatePlayerDto) {
      return this.service.create(dto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlayerDto) {
      return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
      return this.service.remove(id);
    }
}