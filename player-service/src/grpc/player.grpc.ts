import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDef = protoLoader.loadSync(__dirname + '/player.proto', {});

const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
const client = new grpcObject.player.PlayerService('localhost:50051', grpc.credentials.createInsecure());

client.GetPlayerById({ id: 1 }, (err, res) => {
  if (err) console.error(err);
  else console.log(res);
});
