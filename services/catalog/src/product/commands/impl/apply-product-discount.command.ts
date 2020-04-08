export class ApplyProductDiscountCommand {
  constructor(
    public readonly productId: number,
    public readonly discount: number,
  ) {}
}
