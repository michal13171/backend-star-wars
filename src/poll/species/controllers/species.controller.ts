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
import { SpeciesService } from '../services/species.service';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { PaginationInterface } from '../../../config/interfaces/pagination.interface';
import { SpeciesInterface } from '../interfaces/species.interface';

@ApiTags('species')
@UseInterceptors(CacheInterceptor)
@Controller('species')
export class SpeciesController {
  private readonly logger = new Logger(SpeciesController.name);

  constructor(private speciesService: SpeciesService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all species with pagination example: ?page=1&pageSize=5`,
  })
  getAllSpecies(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationInterface<SpeciesInterface[]>> {
    try {
      return this.speciesService.getAllSpecies(paginationDto);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `Single species with relationships`,
  })
  getSpecies(@Param('id', ParseIntPipe) id: number): Promise<SpeciesInterface> {
    try {
      return this.speciesService.getSpecies(id);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }
}
