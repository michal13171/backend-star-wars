import {Injectable} from '@nestjs/common';
import axios from "axios";

@Injectable()
export class AppService {
	async fetchData(url: string): Promise<any> {
		const response = await axios.get(url);
		return response.data;
	}
}
