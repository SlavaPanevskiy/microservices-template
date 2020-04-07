import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CqrsModule } from "@nestjs/cqrs";
import { CommandHandlers } from "./commands/handlers";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'CATALOG_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        },
      },
    ]),
    CqrsModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...CommandHandlers,
  ],
})
export class ProductModule {}
