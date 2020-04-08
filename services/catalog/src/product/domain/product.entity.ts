import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { Discount } from './dicount.entity';
import { ProductPriceChangedEvent } from '../events/product-price-changed.event';

@Entity()
export class Product extends AggregateRoot {
  private readonly MINIMAL_DISCOUNT_PRICE = 100;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column({ type: 'float', nullable: true })
  discountedPrice: number;

  @Column({ default: true })
  isVisible: boolean;

  @ManyToMany(type => Discount)
  @JoinTable()
  discounts: Discount[];

  hideProduct() {
    this.isVisible = false;
  }

  applyDiscount(discount: Discount) {
    if (this.price > this.MINIMAL_DISCOUNT_PRICE) {
      this.discounts = [discount];
      this.discountedPrice = discount.discountPercent * this.price;

      this.apply(new ProductPriceChangedEvent(this.id, this.discountedPrice));
    }
  }
}
