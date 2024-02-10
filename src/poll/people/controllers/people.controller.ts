import {
  Controller,
  Get,
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
    return this.peopleService.getAllPeople(paginationDto);
  }

  @Get(':id')
  @MessagePattern('people')
  @ApiResponse({
    status: 200,
    description: `Single people with relationships`,
  })
  getPeople(@Param('id', ParseIntPipe) id: number): Promise<PeopleInterface> {
    return this.peopleService.getPeople(id);
  }
}
