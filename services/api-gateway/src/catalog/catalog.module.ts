import { Module } from '@nestjs/common';
import { CatalogItemService } from './catalog-item/catalog-item-client.service';
import { CatalogItemResolver } from './catalog-item/catalog-item.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOG_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        },
      },
    ]),
  ],
  providers: [CatalogItemService, CatalogItemResolver],
  exports: [CatalogItemResolver],
})
export class CatalogModule {}
