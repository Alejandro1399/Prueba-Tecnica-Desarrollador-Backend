import { DataSource } from "typeorm";
import { Auth, Product, ProductPurchase, Roles } from "../models/";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [Auth, Product, ProductPurchase, Roles],
  synchronize: true,
});
