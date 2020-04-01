import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
    async listItems() {
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

    async createItem() {
        return {
            id: '1',
            name: 'Cup',
            description: 'A good item',
            price: 100
        }
    }
}
