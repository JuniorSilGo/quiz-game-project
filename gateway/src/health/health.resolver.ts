import {Query, Resolver} from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
    @Query(() => String, {description: 'Healthcheck do Gateway'})
    health(): string {
        return 'ok';
    }
}
