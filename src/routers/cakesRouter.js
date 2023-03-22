import { Router } from "express";
import { postCakes } from "../controller/cakesController.js";
import { validateCake } from "../middleware/cakesMiddleware.js";
import cakesSchema from "../schemas/cakesSchema.js";

const router = Router()

router.post("/cakes", validateCake(cakesSchema), postCakes)

export default router