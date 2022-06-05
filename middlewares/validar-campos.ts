import { validationResult } from "express-validator";
import { response, request, NextFunction } from "express";

export const validarCampos =  (req = request, res = response, next : NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};
