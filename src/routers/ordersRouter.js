import { Router } from "express";
import { postOrder, getOrder, getOrderById } from "../controller/ordersController.js";
import { validateOrders } from "../middleware/ordersMiddleware.js";
import ordersSchema from "../schemas/ordersSchema.js";

const router = Router()

router.post("/order", validateOrders(ordersSchema), postOrder)
router.get("/orders", getOrder)
router.get("/orders/:id", getOrderById)

export default router