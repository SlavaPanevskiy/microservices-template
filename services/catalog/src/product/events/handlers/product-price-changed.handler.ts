import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { ProductPriceChangedEvent } from '../product-price-changed.event';

@EventsHandler(ProductPriceChangedEvent)
export class ProductPriceChangedHandler
  implements IEventHandler<ProductPriceChangedEvent> {
  handle(event: ProductPriceChangedEvent) {
    console.log(clc.yellowBright('Async ProductPriceChangedEvent...'));
  }
}
