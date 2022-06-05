import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auth, Product } from "./index";

@Entity("product_purchase")
export class ProductPurchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product;
  @ManyToOne(() => Auth, (auth) => auth.purchases)
  user: Auth;
  @CreateDateColumn()
  purchaseDate: Date;
  @Column()
  total: number;
}
