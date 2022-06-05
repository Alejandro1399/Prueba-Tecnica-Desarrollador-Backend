import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";
import { validarExistName } from "../helpers/db-validators";
import { purchasesCreate } from "../controllers/productPurchase.controllers";

const purchasesRouter = Router();



purchasesRouter.post(
  "/purchases/create",
  [
    check("products", "Los productos son obligatorios").not().isEmpty(),
    check("user", "El id del usuario es obligatorio").not().isEmpty(),
    check("name").custom(validarExistName),
    validarCampos,
  ],
  purchasesCreate
);

export { purchasesRouter };
