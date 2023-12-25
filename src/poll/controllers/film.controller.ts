import {Controller, Get, Param, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';
import {FilmService} from "@services";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {PaginationDto} from "../dto/pagination.dto";
import {FilmEntity} from "@entities";
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('films')
@UseInterceptors(CacheInterceptor)
@Controller('films')
export class FilmController {
	constructor(private filmService: FilmService) {}
	
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
		description: `Get all films with pagination example: ?page=1&pageSize=5 in url address you will see unique words with counted length`
	})
	getAllPeople(@Query() paginationDto: PaginationDto): any {
		return this.filmService.getAllFilms(paginationDto);
	}
	
	@Get(':id')
	@ApiResponse({
		status: 200,
		description: `Single film with relationships`
	})
	getPeople(@Param('id', ParseIntPipe) id: number): Promise<FilmEntity> {
		return this.filmService.getFilm(id);
	}
}
