import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { VehicleService } from '../services/vehicle.service';
import { PaginationInterface } from '../../../config/interfaces/pagination.interface';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { VehiclesInterface } from '../interfaces/vehicles.interface';

@ApiTags('vehicles')
@UseInterceptors(CacheInterceptor)
@Controller('vehicle')
export class VehicleController {
  constructor(private vehiclesService: VehicleService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all vehicles with pagination example: ?page=1&pageSize=5`,
  })
  getAllVehicles(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationInterface<VehiclesInterface[]>> {
    return this.vehiclesService.getAllVehicles(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `Single vehicle with relationships`,
  })
  getVehicle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VehiclesInterface> {
    return this.vehiclesService.getVehicle(id);
  }
}
