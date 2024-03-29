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
import { StarshipService } from '../services/starship.service';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { StarshipsInterface } from '../interfaces/starships.interface';
import { PaginationInterface } from '../../../config/interfaces/pagination.interface';

@ApiTags('starships')
@UseInterceptors(CacheInterceptor)
@Controller('starship')
export class StarshipController {
  private readonly logger = new Logger(StarshipController.name);

  constructor(private starshipsService: StarshipService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all starships with pagination example: ?page=1&pageSize=5`,
  })
  getAllStarships(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationInterface<StarshipsInterface[]>> {
    try {
      return this.starshipsService.getAllStarships(paginationDto);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `Single starship with relationships`,
  })
  getStarship(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StarshipsInterface> {
    try {
      return this.starshipsService.getStarship(id);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }
}
