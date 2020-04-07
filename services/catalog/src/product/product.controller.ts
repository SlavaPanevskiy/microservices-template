import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateProductCommand } from "./commands/impl/create-product.command";
import * as faker from 'faker';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly productService: ProductService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    ) {
  }

  @MessagePattern({ type: 'get-products' })
  public async getProductItems(): Promise<{}[]> {
    return this.productService.listItems();
  }

  @MessagePattern({ type: 'create-product' })
  public async createProductItem(): Promise<{}> {
    return this.commandBus.execute(new CreateProductCommand(
      faker.commerce.productName(),
      faker.commerce.product(),
      faker.commerce.price()
    ));
  }

  @EventPattern('product_created')
  public async handleItemCreated(data: any) {
    this.logger.log('Product created event received');
  }
}
