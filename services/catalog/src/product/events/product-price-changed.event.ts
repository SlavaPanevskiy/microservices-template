export class ProductPriceChangedEvent {
  constructor(
    public readonly productId: number,
    public readonly price: number,
  ) {}
}
