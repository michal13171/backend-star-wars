import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MyLogger} from "./config/logger";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new MyLogger()
    });
    
    await app.listen(3000);
  }catch (e) {
    Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap')
    process.exit()
  }

}
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap')
  throw e
});
