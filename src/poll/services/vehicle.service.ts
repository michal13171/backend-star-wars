import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleService {
  // constructor(
  //   @InjectRepository(VehicleEntity)
  //   private entityRepository: Repository<VehicleEntity>,
  // ) {}
  //
  // getAllVehicles(paginationDto: PaginationDto) {
  //   const { page, pageSize } = paginationDto;
  //   const skip = (page - 1) * pageSize;
  //
  //   return this.entityRepository.find({
  //     take: pageSize,
  //     skip: skip,
  //     relations: {
  //       films: true,
  //     },
  //   });
  // }
  //
  // getVehicle(idk: number) {
  //   return this.entityRepository.findOne({
  //     where: {
  //       id: idk,
  //     },
  //     relations: {
  //       films: true,
  //     },
  //   });
  // }
}
