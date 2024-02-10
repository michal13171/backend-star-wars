import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleService {
  // constructor(
  //   @InjectRepository(PeopleEntity)
  //   private entityRepository: Repository<PeopleEntity>,
  // ) {}
  //
  // getAllPeople(paginationDto: PaginationDto) {
  //   const { page, pageSize } = paginationDto;
  //   const skip = (page - 1) * pageSize;
  //
  //   return this.entityRepository.find({
  //     take: pageSize,
  //     skip: skip,
  //     relations: {
  //       films: true,
  //       vehicles: true,
  //       starships: true,
  //       species: true,
  //     },
  //   });
  // }
  //
  // getPeople(idk: number) {
  //   return this.entityRepository.findOne({
  //     where: {
  //       id: idk,
  //     },
  //     relations: {
  //       films: true,
  //       vehicles: true,
  //       starships: true,
  //       species: true,
  //     },
  //   });
  // }
}
