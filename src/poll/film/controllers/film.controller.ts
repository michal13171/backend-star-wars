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
import { FilmService } from '../services/film.service';
import { FilmsInterface } from '../interfaces/films.interface';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MessagePattern } from '@nestjs/microservices';
import { PaginationDto } from '../../../config/dto/pagination.dto';

@ApiTags('films')
@UseInterceptors(CacheInterceptor)
@Controller('films')
export class FilmController {
  private readonly logger = new Logger(FilmController.name);

  constructor(private filmService: FilmService) {}

  @Get()
  @MessagePattern('films')
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: `Get all unique words with counted length`,
  })
  getAllFilms(@Query() paginationDto: PaginationDto) {
    try {
      return this.filmService.getAllCharactersFindInTitleFilms(paginationDto);
    } catch (e) {
      this.logger.error(`${e.message}`, 'bootstrap');
    }
  }

  @Get(':id')
  @MessagePattern('film')
  @ApiResponse({
    status: 200,
    description: `Single film with relationships`,
  })
  getFilm(@Param('id', ParseIntPipe) id: number): Promise<FilmsInterface> {
    try {
      return this.filmService.getFilm(id);
    } catch (e) {
      this.logger.error(`Server dont have data ${e.messages}`, 'bootstrap');
    }
  }
}
