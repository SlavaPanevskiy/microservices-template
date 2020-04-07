import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from "../impl/create-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../../product.entity";
import { Repository } from "typeorm";
import { ProductCreatedEvent } from "../../events/ProductCreatedEvent";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
    private readonly publisher: EventPublisher,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateProductCommand) {
    const product = new Product();
    Object.assign(product, command);
    await this.repository.save(product);

    this.eventBus.publish(new ProductCreatedEvent());

    return product;
  }
}
