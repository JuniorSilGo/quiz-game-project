import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

const protoPath = join(__dirname, 'match_engine.proto');
const packageDef = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const client = new grpcObject.match_engine.MatchEngineService(
  'localhost:50054',
  grpc.credentials.createInsecure()
);

client.StartMatch({ roomId: 1 }, (err: any, res: any) => {
  if (err) console.error('Erro StartMatch:', err);
  else console.log('Resposta StartMatch:', res);
});

client.SubmitAnswer({ matchId: 1, playerId: 1, answerId: 2 }, (err: any, res: any) => {
  if (err) console.error('Erro SubmitAnswer:', err);
  else console.log('Resposta SubmitAnswer:', res);
});

client.GetState({ matchId: 1 }, (err: any, res: any) => {
  if (err) console.error('Erro GetState:', err);
  else console.log('Resposta GetState:', res);
});
