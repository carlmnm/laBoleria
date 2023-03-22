import { Router } from "express";
import { postOrder } from "../controller/ordersController.js";
import { validateOrders } from "../middleware/ordersMiddleware.js";
import ordersSchema from "../schemas/ordersSchema.js";

const router = Router()

router.post("/order", validateOrders(ordersSchema), postOrder)

export default router