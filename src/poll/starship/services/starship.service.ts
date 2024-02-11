import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { UL_SWAPI } from '@environments';

@Injectable()
export class StarshipService {
  private readonly logger = new Logger(StarshipService.name);

  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_STARSHIP_SERVICE') private client: ClientProxy,
  ) {}

  getAllStarships(paginationDto: PaginationDto) {
    const pattern = { cmd: 'starship_listing' };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/starships`, paginationDto)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }

  getStarship(idk: number) {
    const pattern = { cmd: `starship_${idk}` };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/starships/${idk}`)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }
}
