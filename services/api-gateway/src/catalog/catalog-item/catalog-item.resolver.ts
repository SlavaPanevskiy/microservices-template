import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatalogItem } from '../../schemas/graphql';
import { CatalogItemService } from './catalog-item-client.service';

@Resolver('CatalogItem')
export class CatalogItemResolver {
  constructor(private readonly catalogItemService: CatalogItemService) {}

  @Query()
  public async getCatalogItems(): Promise<CatalogItem[]> {
    return this.catalogItemService.getCatalogItems();
  }

  @Mutation()
  public async createCatalogItem(): Promise<CatalogItem> {
    return this.catalogItemService.createCatalogItem();
  }

  @Mutation()
  public async applyProductDiscount(): Promise<CatalogItem> {
    return this.catalogItemService.applyProductDiscount();
  }
}
