import {Controller, Get, Param, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';
import {PeopleService} from "@services";
import {PeopleEntity} from "@entities";
import {PaginationDto} from "../dto/pagination.dto";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {CacheKey} from "@nestjs/common/cache";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('peoples')
@ApiTags('peoples')
export class PeopleController {
	constructor(private peopleService: PeopleService) {}
	
	@UseInterceptors(CacheInterceptor)
	@CacheKey("people")
	@Get()
	@ApiResponse({ status: 200, description: `Get all people with pagination example: ?page=1&pageSize=5` })
	getAllPeople(@Query() paginationDto: PaginationDto): Promise<PeopleEntity[]> {
		return this.peopleService.getAllPeople(paginationDto);
	}
	
	@Get(':id')
	@ApiResponse({ status: 200, description: `Single people with relationships`})
	getPeople(@Param('id', ParseIntPipe) id: number): Promise<PeopleEntity> {
		return this.peopleService.getPeople(id);
	}
}
