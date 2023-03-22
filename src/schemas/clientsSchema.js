import Joi from "joi";

const clientsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    address: Joi.string().min(1).required(),
    phone: Joi.string().min(10).required()
})

export default clientsSchema;