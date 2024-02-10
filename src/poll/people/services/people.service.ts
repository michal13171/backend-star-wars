import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { AppService } from '../../../config/services/app.service';
import { UL_SWAPI } from '@environments';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PeopleService {
  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_PEOPLE_SERVICE') private client: ClientProxy,
  ) {}

  async getAllPeople(paginationDto: PaginationDto) {
    const pattern = { cmd: 'people_listing' };
    const payload = this.appService.fetchData(
      `${UL_SWAPI}/people`,
      paginationDto,
    );
    this.client.send(pattern, payload);

    return payload;
  }

  async getPeople(idk: number) {
    const pattern = { cmd: `people_${idk}` };
    const payload = this.appService.fetchData(`${UL_SWAPI}/people/${idk}`);
    this.client.send(pattern, payload);

    return payload;
  }
}
