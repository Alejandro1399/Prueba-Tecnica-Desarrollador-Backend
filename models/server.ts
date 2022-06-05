import express from "express";
import cors from "cors";
import { router } from "../routes/";
import { AppDataSource } from "../database/config.db";
import { existRole } from "../helpers/db-validators";

export default class Server {
  app: any;
  port: string | number;
  path: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;
    this.path = "/api";

    // Database connection
    this.connectionDb();

    // Middlewares
    this.middlewares();

    // routes
    this.routes();
  }

  async connectionDb() {
    try {
      await AppDataSource.initialize();
      existRole();
      console.log("Base de datos online");
    } catch (error) {
      console.log(error);
      throw new Error("Error al conectar con la base de datos");
    }
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // Parseo Json del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.path, router);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto : ${this.port}`);
    });
  }
}
