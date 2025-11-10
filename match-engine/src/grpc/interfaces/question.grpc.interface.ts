export interface QuestionServiceClient {
  fetchQuestion(data: { roomId: number; roundIndex: number }): Promise<{ questionId:number; text:string; options:any[] }>;
}
