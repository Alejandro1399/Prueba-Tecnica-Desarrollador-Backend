import { Router } from "express";
import { check } from "express-validator";

import {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
  login,
} from "../controllers/auth.controllers";

import { validarCampos } from "../middlewares/validar-campos";
import { validarRol, validarExistEmail } from "../helpers/db-validators";

const authRouter = Router();

authRouter.get("/auth/all", [], usuariosGet);

authRouter.put("/auth/:id", [], usuariosPut);

authRouter.post(
  "/auth/create",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(validarExistEmail),
    check("money", "La cantidad de dinero es obligatoria").not().isEmpty(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("role").custom(validarRol),
    validarCampos,
  ],
  usuariosPost
);

authRouter.delete("/auth/:id", [], usuariosDelete);

authRouter.post(
  "/auth/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

export { authRouter };
