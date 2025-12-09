import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';

export const grpcServerOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: 'match',
    protoPath: join(__dirname, '../infrastructure/grpc/proto/match.proto'),
  },
};
