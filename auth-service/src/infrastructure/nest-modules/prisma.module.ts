import {Global, Module} from "@nestjs/common";
import {PrismaService} from "../services/prisma.service";
import {PrismaClient} from "@prisma/client";

@Global()
@Module({
    imports: [PrismaClient],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {
}
