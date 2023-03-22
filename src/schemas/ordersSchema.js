import Joi from "joi";

const ordersSchema = Joi.object({
    clientId: Joi.number().required(),
    cakeId: Joi.number().required(),
    totalPrice: Joi.number().required(),
    quantity: Joi.number().integer().min(0).max(4).required()
})

export default ordersSchema;