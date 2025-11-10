import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {UserService} from "./user.service";

@Controller()
export class UserGrpcController {
    constructor(private readonly user: UserService) {
    }

    @GrpcMethod('UserService', 'GetUser')
    userId({userId}: { userId: number }) {
        return this.user.getById(userId)
    }

    @GrpcMethod('UserService', 'RecordMatch')
    async recordMatch({userId, didWin}: { userId: number; didWin: boolean }) {
        return this.user.recordMatch(userId, didWin);
    }
}
