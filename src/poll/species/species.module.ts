import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache';
import { RedisOptions } from '../../config/cache';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from '@environments';
import { AppService } from '../../config/services/app.service';
import { SpeciesController } from './controllers/species.controller';
import { SpeciesService } from './services/species.service';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ClientsModule.register([
      {
        name: 'GLOBAL_SPECIES_SERVICE',
        transport: Transport.REDIS,
        options: REDIS,
      },
    ]),
    SpeciesModule,
  ],
  controllers: [SpeciesController],
  providers: [AppService, SpeciesService],
  exports: [SpeciesModule],
})
export class SpeciesModule {}
