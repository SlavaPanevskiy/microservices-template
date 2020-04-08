import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../domain/product.entity';
import { Repository } from 'typeorm';
import { ApplyProductDiscountCommand } from '../impl/apply-product-discount.command';
import { Discount } from '../../domain/dicount.entity';

@CommandHandler(ApplyProductDiscountCommand)
export class ApplyProductDiscountHandler
  implements ICommandHandler<ApplyProductDiscountCommand> {
  constructor(
    @InjectRepository(Product)
    protected readonly productRepository: Repository<Product>,
    @InjectRepository(Discount)
    protected readonly discountRepository: Repository<Discount>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ApplyProductDiscountCommand) {
    const discount = new Discount();
    discount.discountPercent = command.discount;
    await this.discountRepository.save(discount);

    const product = this.publisher.mergeObjectContext(
      await this.productRepository.findOne(command.productId),
    );

    product.applyDiscount(discount);
    await this.productRepository.save(product);
    product.commit();
  }
}
