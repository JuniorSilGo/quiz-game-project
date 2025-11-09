import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {UserService} from './user.service';

@Controller()
export class UserController {
    constructor(private readonly user: UserService) {
    }

    @GrpcMethod('UserService', 'RecordMatch')
    async recordMatch({userId, didWin}: { userId: number; didWin: boolean }) {
        return this.user.recordMatch(userId, didWin);
    }
}
