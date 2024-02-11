import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache';
import { RedisOptions } from '../../config/cache';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from '@environments';
import { AppService } from '../../config/services/app.service';
import { StarshipController } from './controllers/starship.controller';
import { StarshipService } from './services/starship.service';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ClientsModule.register([
      {
        name: 'GLOBAL_STARSHIP_SERVICE',
        transport: Transport.REDIS,
        options: REDIS,
      },
    ]),
    StarshipModule,
  ],
  controllers: [StarshipController],
  providers: [AppService, StarshipService],
  exports: [StarshipModule],
})
export class StarshipModule {}
