import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { CatalogItemCreatedEvent } from "./events/CatalogItemCreatedEvent";

@Injectable()
export class CatalogService {
    constructor(
        @Inject('CATALOG_SERVICE') private client: ClientProxy,
    ) {}

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
        this.client.emit<number>('catalog_item_created', new CatalogItemCreatedEvent());
        return {
            id: '1',
            name: 'Cup',
            description: 'A good item',
            price: 100
        }
    }
}
