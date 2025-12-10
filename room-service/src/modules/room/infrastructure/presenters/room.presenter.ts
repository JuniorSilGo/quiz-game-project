import { RoomPresenterInputDto } from '../../application/dto/room.presenter.input.dto';

export class RoomPresenter {
  static present(data: RoomPresenterInputDto) {
    return {
      roomName: data.roomName,
      topic: data.topic,
      difficulty: data.difficulty,
      rounds: data.rounds,
      players: data.players,
      currentRound: data.currentRound,
      totalRounds: data.totalRounds,
    };
  }
}
