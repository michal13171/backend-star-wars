import { Inject, Injectable } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { UL_SWAPI } from '@environments';

@Injectable()
export class StarshipService {
  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_STARSHIP_SERVICE') private client: ClientProxy,
  ) {}

  getAllStarships(paginationDto: PaginationDto) {
    const pattern = { cmd: 'starship_listing' };
    const payload = this.appService.fetchData(
      `${UL_SWAPI}/starships`,
      paginationDto,
    );
    this.client.send(pattern, payload);

    return payload;
  }

  getStarship(idk: number) {
    const pattern = { cmd: `starship_${idk}` };
    const payload = this.appService.fetchData(`${UL_SWAPI}/starships/${idk}`);
    this.client.send(pattern, payload);

    return payload;
  }
}
