import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	helloworld(): string {
		return "Hello World";
	}
}
