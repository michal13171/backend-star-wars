import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { UL_SWAPI } from '@environments';

@Injectable()
export class SpeciesService {
  private readonly logger = new Logger(SpeciesService.name);

  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_SPECIES_SERVICE') private client: ClientProxy,
  ) {}

  getAllSpecies(paginationDto: PaginationDto) {
    const pattern = { cmd: 'species_listing' };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/species`, paginationDto)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }

  getSpecies(idk: number) {
    const pattern = { cmd: `species_${idk}` };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/species/${idk}`)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }
}
