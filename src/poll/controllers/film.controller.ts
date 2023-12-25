import {Controller, Get, Param, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';
import {FilmService} from "@services";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {CacheKey} from "@nestjs/common/cache";
import {PaginationDto} from "../dto/pagination.dto";
import {FilmEntity} from "@entities";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('films')
@ApiTags('films')
export class FilmController {
	constructor(private filmService: FilmService) {}
	
	@UseInterceptors(CacheInterceptor)
	@CacheKey("film")
	@Get()
	@ApiResponse({ status: 200, description: `Get all films with pagination example: ?page=1&pageSize=5 in url address you will see unique words with counted length` })
	getAllPeople(@Query() paginationDto: PaginationDto): Promise<any[]> {
		return this.filmService.getAllFilms(paginationDto);
	}
	
	@Get(':id')
	@ApiResponse({ status: 200, description: `Single film with relationships`})
	getPeople(@Param('id', ParseIntPipe) id: number): Promise<FilmEntity> {
		return this.filmService.getFilm(id);
	}
}
