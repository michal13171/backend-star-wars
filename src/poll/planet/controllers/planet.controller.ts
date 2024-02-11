import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PlanetService } from '../services/planet.service';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { PaginationInterface } from '../../../config/interfaces/pagination.interface';
import { PlanetsInterface } from '../interfaces/planets.interface';

@ApiTags('planets')
@UseInterceptors(CacheInterceptor)
@Controller('planet')
export class PlanetController {
  private readonly logger = new Logger(PlanetController.name);

  constructor(private planetService: PlanetService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all planets with pagination example: ?page=1&pageSize=5`,
  })
  getAllPlanets(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationInterface<PlanetsInterface[]>> {
    try {
      return this.planetService.getAllPlanet(paginationDto);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `Single planet with relationships`,
  })
  getPlanet(@Param('id', ParseIntPipe) id: number): Promise<PlanetsInterface> {
    try {
      return this.planetService.getPlanet(id);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }
}
