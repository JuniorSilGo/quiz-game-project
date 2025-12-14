import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';

export const grpcServerOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:' + (process.env.GRPC_PORT || '50053'),
    package: 'match',
    protoPath: join(__dirname, '../infrastructure/grpc/proto/match.proto'),
  },
};
