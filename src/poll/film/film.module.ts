import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache';
import { RedisOptions } from '../../config/cache';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from '@environments';
import { AppService } from '../../config/services/app.service';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ClientsModule.register([
      {
        name: 'GLOBAL_FILM_SERVICE',
        transport: Transport.REDIS,
        options: REDIS,
      },
    ]),
    FilmModule,
  ],
  controllers: [FilmController],
  providers: [AppService, FilmService],
  exports: [FilmModule],
})
export class FilmModule {}
