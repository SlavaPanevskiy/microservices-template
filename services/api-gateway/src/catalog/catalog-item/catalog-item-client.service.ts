import {Inject, Injectable} from '@nestjs/common';
import { CatalogItem } from '../../schemas/graphql';
import {Client, ClientProxy, Transport} from "@nestjs/microservices";

@Injectable()
export class CatalogItemService {
  constructor(
      @Inject('CATALOG_SERVICE') private client: ClientProxy,
  ) {}

  public async getCatalogItems(): Promise<CatalogItem[]> {
    return this.client.send<CatalogItem[]>(
        { type: 'get-catalog-items' },
        { someParam: 15 }
    ).toPromise();
  }
}
