import { Inject, Injectable } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { UL_SWAPI } from '@environments';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_VEHICLE_SERVICE') private client: ClientProxy,
  ) {}

  getAllVehicles(paginationDto: PaginationDto) {
    const pattern = { cmd: 'vehicle_listing' };
    const payload = this.appService.fetchData(
      `${UL_SWAPI}/vehicles`,
      paginationDto,
    );
    this.client.send(pattern, payload);

    return payload;
  }

  getVehicle(idk: number) {
    const pattern = { cmd: `vehicle_${idk}` };
    const payload = this.appService.fetchData(`${UL_SWAPI}/vehicles/${idk}`);
    this.client.send(pattern, payload);

    return payload;
  }
}
