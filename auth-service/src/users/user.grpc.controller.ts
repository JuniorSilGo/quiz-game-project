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

}
