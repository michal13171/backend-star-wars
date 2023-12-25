import {Controller, Get, Param, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';
import {FilmService} from "@services";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {CacheKey} from "@nestjs/common/cache";
import {PaginationDto} from "../dto/pagination.dto";
import {FilmEntity} from "@entities";

@Controller('films')
export class FilmController {
	constructor(private filmService: FilmService) {}
	
	@UseInterceptors(CacheInterceptor)
	@CacheKey("film")
	@Get()
	getAllPeople(@Query() paginationDto: PaginationDto): Promise<any[]> {
		return this.filmService.getAllFilms(paginationDto);
	}
	
	@Get(':id')
	getPeople(@Param('id', ParseIntPipe) id: number): Promise<FilmEntity> {
		return this.filmService.getFilm(id);
	}
}
