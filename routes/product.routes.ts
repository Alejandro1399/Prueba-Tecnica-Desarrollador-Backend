import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";
import { validarExistName } from "../helpers/db-validators";
import {
  productosGet,
  productosPut,
  productosCreate,
  productosDelete,
} from "../controllers/product.controllers";

const productRouter = Router();

productRouter.get("/product/all", [], productosGet);

productRouter.post(
  "/product/create",
  [
    check("name", "El nombre es obligarorio").not().isEmpty(),
    check("name").custom(validarExistName),
    check("category", "La categoria es obligaroria").not().isEmpty(),
    check("price", "El precio es obligarorio").not().isEmpty(),
    check("quantity", "La cantida de productos es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  productosCreate
);

productRouter.put("/product/:id", [], productosPut);

productRouter.delete("/product/:id", [], productosDelete);

export { productRouter };
