import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {CatalogService} from "./catalog.service";

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @MessagePattern({ type: 'get-catalog-items' })
  public async getCatalogItems(): Promise<{}[]> {
    return this.catalogService.listItems();
  }

  @MessagePattern({ type: 'create-catalog-item' })
  public async createCatalogItem(): Promise<{}> {
    return this.catalogService.createItem();
  }
}
