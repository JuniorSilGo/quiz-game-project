export interface RoomServiceClient {
  getRoom(data: { roomId: number }): Promise<{ id: number; players: Array<{ id:number; username:string }>; }>;
  notifyMatchStarted(data: { roomId: number; matchId: number }): Promise<any>;
}
