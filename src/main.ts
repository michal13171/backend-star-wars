import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PORT, REDIS } from '@environments';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.REDIS,
      options: REDIS,
    });

    const config = new DocumentBuilder()
      .setTitle('Star wars API')
      .setDescription('The star wars API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.startAllMicroservices();
    await app.listen(PORT);
  } catch (e) {
    Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap');
    process.exit();
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap');
  throw e;
});
