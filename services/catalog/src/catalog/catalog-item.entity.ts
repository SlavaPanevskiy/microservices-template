import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("float")
    price: number;
}
