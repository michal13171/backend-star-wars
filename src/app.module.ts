import { Module } from '@nestjs/common';
import { UtilsModule } from './poll/utils.module';
import { AppController } from './config/controllers/app.controller';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilsModule
  ],
  controllers: [AppController],
})
export class AppModule {}
