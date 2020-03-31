import { Injectable } from '@nestjs/common';
import { CatalogItem } from '../../schemas/graphql';

@Injectable()
export class CatalogItemService {
  public async getCatalogItems(): Promise<CatalogItem[]> {
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
}
