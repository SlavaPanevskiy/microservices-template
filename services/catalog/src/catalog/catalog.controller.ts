import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CatalogService } from "./catalog.service";

@Controller('catalog')
export class CatalogController {
  private readonly logger = new Logger(CatalogController.name);

  constructor(private readonly catalogService: CatalogService) {}

  @MessagePattern({ type: 'get-catalog-items' })
  public async getCatalogItems(): Promise<{}[]> {
    return this.catalogService.listItems();
  }

  @MessagePattern({ type: 'create-catalog-item' })
  public async createCatalogItem(): Promise<{}> {
    return this.catalogService.createItem();
  }

  @EventPattern('catalog_item_created')
  public async handleItemCreated(data: any) {
    this.logger.log('Catalog item created event')
  }
}
