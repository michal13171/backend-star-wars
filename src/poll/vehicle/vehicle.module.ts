import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache';
import { RedisOptions } from '../../config/cache';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from '@environments';
import { AppService } from '../../config/services/app.service';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleService } from './services/vehicle.service';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ClientsModule.register([
      {
        name: 'GLOBAL_VEHICLE_SERVICE',
        transport: Transport.REDIS,
        options: REDIS,
      },
    ]),
    VehicleModule,
  ],
  controllers: [VehicleController],
  providers: [AppService, VehicleService],
  exports: [VehicleModule],
})
export class VehicleModule {}
