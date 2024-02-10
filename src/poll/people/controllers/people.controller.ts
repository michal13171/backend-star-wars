import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from '@services';
import { PeopleEntity } from '@entities';
import { PaginationDto } from '../../../config/dto/pagination.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseInterceptors(CacheInterceptor)
@ApiTags('peoples')
@Controller('peoples')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all people with pagination example: ?page=1&pageSize=5`,
  })
  getAllPeople(@Query() paginationDto: PaginationDto): Promise<PeopleEntity[]> {
    return this.peopleService.getAllPeople(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `Single people with relationships`,
  })
  getPeople(@Param('id', ParseIntPipe) id: number): Promise<PeopleEntity> {
    return this.peopleService.getPeople(id);
  }
}
