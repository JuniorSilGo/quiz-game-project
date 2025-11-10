import {Module} from '@nestjs/common';
import {MatchEngineModule} from './match-engine/match-engine.module';

@Module({
    imports: [MatchEngineModule]
})
export class AppModule {
}
