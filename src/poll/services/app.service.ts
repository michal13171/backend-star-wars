import {Inject, Injectable, Logger} from '@nestjs/common';
import axios from "axios";
import {UL_SWAPI} from "@environments";
import {PaginationInterface} from "../interfaces/pagination.interface";
import {PeopleInterface} from "../interfaces/people.interface";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  
  async storePeopleCacheAndDatabase(): Promise<PaginationInterface<PeopleInterface>> {
    try {
      const cacheKey = `people`;
      const response: any = await axios.get(
        `${UL_SWAPI}people/?format=json`,
      );
      const data = response.data;
      this.cacheManager.set(cacheKey, data.results);
      
      Logger.log(data,
        'Bootstrap');
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  async getPeople(): Promise<any> {
    return this.cacheManager.get('people')
  }
}
