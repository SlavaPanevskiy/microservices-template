import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product/product.entity";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "catalog",
      entities: [ Product ],
      synchronize: true,
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
