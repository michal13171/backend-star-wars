import {Controller, Get, UseInterceptors} from '@nestjs/common';
import { AppService } from '../services/app.service';
import {CacheInterceptor} from "@nestjs/cache-manager";
import {PeopleInterface} from "../interfaces/people.interface";

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}
	
  @Get()
  getPeople(): Promise<PeopleInterface[]> {
    return this.appService.getPeoples();
  }
}
