import { Inject, Injectable } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { UL_SWAPI } from '@environments';

@Injectable()
export class PlanetService {
  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_PLANET_SERVICE') private client: ClientProxy,
  ) {}

  getAllPlanet(paginationDto: PaginationDto) {
    const pattern = { cmd: 'planets_listing' };
    const payload = this.appService.fetchData(
      `${UL_SWAPI}/planets`,
      paginationDto,
    );
    this.client.send(pattern, payload);

    return payload;
  }

  getPlanet(idk: number) {
    const pattern = { cmd: `planets_${idk}` };
    const payload = this.appService.fetchData(`${UL_SWAPI}/planets/${idk}`);
    this.client.send(pattern, payload);

    return payload;
  }
}
