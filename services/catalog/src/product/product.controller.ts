import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ type: 'get-products' })
  public async getproductItems(): Promise<{}[]> {
    return this.productService.listItems();
  }

  @MessagePattern({ type: 'create-product' })
  public async createproductItem(): Promise<{}> {
    return this.productService.createItem();
  }

  @EventPattern('product_created')
  public async handleItemCreated(data: any) {
    this.logger.log('Product created event received');
  }
}
