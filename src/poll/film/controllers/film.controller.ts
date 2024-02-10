import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilmService } from '../services/film.service';
import { FilmsInterface } from '../interfaces/films.interface';

@ApiTags('films')
@UseInterceptors(CacheInterceptor)
@Controller('films')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get all unique words with counted length`,
  })
  getAllPeople(): any {
    return this.filmService.getAllFilms();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `Single film with relationships`,
  })
  getPeople(@Param('id', ParseIntPipe) id: number): Promise<FilmsInterface> {
    return this.filmService.getFilm(id);
  }
}
