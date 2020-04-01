import { Module } from '@nestjs/common';
import { CatalogController } from "./catalog/catalog.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CatalogService } from './catalog/catalog.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOG_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        }
      },
    ])
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class AppModule {}
