import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { UL_SWAPI } from '@environments';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_VEHICLE_SERVICE') private client: ClientProxy,
  ) {}

  getAllVehicles(paginationDto: PaginationDto) {
    const pattern = { cmd: 'vehicle_listing' };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/vehicles`, paginationDto)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }

  getVehicle(idk: number) {
    const pattern = { cmd: `vehicle_${idk}` };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/vehicles/${idk}`)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }
}
