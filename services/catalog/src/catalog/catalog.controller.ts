import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('catalog')
export class CatalogController {
  @MessagePattern({ type: 'get-catalog-items' })
  public async getCatalogItems(): Promise<{}[]> {
    return [
      {
        id: '1',
        name: 'Cup',
        description: 'A good item',
        price: 100
      },
      {
        id: '2',
        name: 'Teapot',
        description: `Another good item`,
        price: 200
      }
    ];
  }

  @MessagePattern({ type: 'create-catalog-item' })
  public async createCatalogItem(): Promise<{}> {
    return {
        id: '1',
        name: 'Cup',
        description: 'A good item',
        price: 100
      }
  }
}
