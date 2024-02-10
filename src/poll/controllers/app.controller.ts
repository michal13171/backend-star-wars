import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('hello')
export class AppController {
  @Get()
  @ApiResponse({ status: 200, description: 'Hello world' })
  helloWorld(): string {
    return 'Hello World';
  }
}
