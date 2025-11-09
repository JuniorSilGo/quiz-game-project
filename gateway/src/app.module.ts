import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {AuthModule} from "./auth/auth.module";
import {HealthResolver} from "./health/health.resolver";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
            playground: process.env.GRAPHQL_PLAYGROUND === 'true',
            subscriptions: {'graphql-ws': true},
            context: ({req}) => ({req}),
        }),
        AuthModule
    ],
    providers: [HealthResolver],
})
export class AppModule {
}
