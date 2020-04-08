import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ProductCreatedEvent } from './events/product-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './domain/product.entity';
import { Repository } from 'typeorm';
import * as faker from 'faker';

@Injectable()
export class ProductService {
  constructor(
    @Inject('CATALOG_SERVICE')
    private client: ClientProxy,
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {}

  async listItems() {
    return this.repository.find();
  }

  async createItem() {
    const product = new Product();
    product.name = faker.commerce.productName();
    product.description = faker.commerce.product();
    product.price = faker.commerce.price();

    await this.repository.save(product);

    this.client.emit<number>('product_created', new ProductCreatedEvent());

    return product;
  }

  @EventPattern('product_created')
  public async handleItemCreated(data: any) {
    console.log('Product created event received');
  }
}
