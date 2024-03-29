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
import { PeopleService } from '../services/people.service';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { PeopleInterface } from '../interfaces/people.interface';
import { MessagePattern } from '@nestjs/microservices';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PaginationInterface } from '../../../config/interfaces/pagination.interface';

@UseInterceptors(CacheInterceptor)
@ApiTags('peoples')
@Controller('peoples')
export class PeopleController {
  private readonly logger = new Logger(PeopleController.name);

  constructor(private peopleService: PeopleService) {}

  @Get()
  @MessagePattern('peoples')
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all people with pagination example: ?page=1&pageSize=5`,
  })
  getAllPeople(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationInterface<PeopleInterface[]>> {
    try {
      return this.peopleService.getAllPeople(paginationDto);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }

  @Get(':id')
  @MessagePattern('people')
  @ApiResponse({
    status: 200,
    description: `Single people with relationships`,
  })
  getPeople(@Param('id', ParseIntPipe) id: number): Promise<PeopleInterface> {
    try {
      return this.peopleService.getPeople(id);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }
}
