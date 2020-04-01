import { Module } from '@nestjs/common';
import { CatalogController } from "./catalog/catalog.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CatalogService } from './catalog/catalog.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatalogItem } from "./catalog/catalog-item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ CatalogItem ]),
    ClientsModule.register([
      {
        name: 'CATALOG_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        }
      },
    ]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "catalog",
      entities: [ CatalogItem ],
      synchronize: true,
    }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class AppModule {}
