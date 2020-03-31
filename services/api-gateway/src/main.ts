import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice({
        transport: Transport.TCP,
    });

    await app.listen(4200);
    console.log('Microservice is listening...')
}
bootstrap();
