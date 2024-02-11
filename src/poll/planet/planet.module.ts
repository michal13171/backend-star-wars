import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache';
import { RedisOptions } from '../../config/cache';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from '@environments';
import { AppService } from '../../config/services/app.service';
import { PlanetController } from './controllers/planet.controller';
import { PlanetService } from './services/planet.service';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ClientsModule.register([
      {
        name: 'GLOBAL_PLANET_SERVICE',
        transport: Transport.REDIS,
        options: REDIS,
      },
    ]),
    PlanetModule,
  ],
  controllers: [PlanetController],
  providers: [AppService, PlanetService],
  exports: [PlanetModule],
})
export class PlanetModule {}
