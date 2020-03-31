import { Module } from '@nestjs/common';
import { CatalogItemService } from './catalog-item/catalog-item-client.service';
import { CatalogItemResolver } from './catalog-item/catalog-item.resolver';

@Module({
  providers: [CatalogItemService, CatalogItemResolver],
  exports: [CatalogItemResolver]
})
export class CatalogModule {}
