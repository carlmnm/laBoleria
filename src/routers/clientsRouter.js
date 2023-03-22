import { Router } from "express";
import { postClients } from "../controller/clientsController.js";
import { validateClients } from "../middleware/clientsMiddleware.js";
import clientsSchema from "../schemas/clientsSchema.js";

const router = Router()

router.post("/clients", validateClients(clientsSchema), postClients)

export default router