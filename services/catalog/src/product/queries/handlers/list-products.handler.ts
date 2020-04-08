import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListProductsQuery } from '../impl';
import { Product } from '../../domain/product.entity';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<ListProductsQuery> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {}

  async execute(query: ListProductsQuery) {
    return this.repository.find();
  }
}
