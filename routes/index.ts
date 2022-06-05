import { Router } from "express";
import { authRouter } from "./auth.routes";
import { productRouter } from "./product.routes";
import { purchasesRouter } from "./purchases.routes";

const router = Router();

router.use("/v1", [authRouter, productRouter,purchasesRouter]);

export { router };
