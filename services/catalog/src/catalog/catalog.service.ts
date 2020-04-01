import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { CatalogItemCreatedEvent } from "./events/CatalogItemCreatedEvent";
import { InjectRepository } from "@nestjs/typeorm";
import { CatalogItem } from "./catalog-item.entity";
import { Repository } from "typeorm";
import  * as faker from 'faker';

@Injectable()
export class CatalogService {
  constructor(
    @Inject('CATALOG_SERVICE')
    private client: ClientProxy,
    @InjectRepository(CatalogItem)
    protected readonly repository: Repository<CatalogItem>,
  ) {
  }

  async listItems() {
    return this.repository.find();
  }

  async createItem() {
    const product = new CatalogItem();
    product.name = faker.commerce.productName();
    product.description = faker.commerce.product();
    product.price = faker.commerce.price();

    await this.repository.save(product);

    this.client.emit<number>('catalog_item_created', new CatalogItemCreatedEvent());

    return product;
  }
}
