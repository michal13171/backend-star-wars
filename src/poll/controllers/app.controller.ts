import {Controller, Get, UseInterceptors} from '@nestjs/common';
import { AppService } from '../services/app.service';
import {PaginationInterface} from "../interfaces/pagination.interface";
import {CacheInterceptor} from "@nestjs/cache-manager";

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): Promise<PaginationInterface<any>> {
    return this.appService.storePeopleCacheAndDatabase();
  }
  @Get('people')
  getPeople(): Promise<any> {
    return this.appService.getPeople();
  }
}
