import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductPurchase } from "./productPurchase";

@Entity("user")
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  money: number;
  @Column()
  state: boolean;
  @OneToMany(() => ProductPurchase, (ProductPurchase) => ProductPurchase.user)
  purchases: ProductPurchase[];
}
