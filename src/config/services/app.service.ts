import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async fetchData(url: string, params = null): Promise<any> {
    const response = await axios.get(url, {
      params: params,
    });

    return response.data;
  }
}
