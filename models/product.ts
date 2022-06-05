import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  category: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  state: boolean;
}
