import Joi from "joi";

const cakesSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(1),
    image: Joi.string().uri().min(1).required(),
})

export default cakesSchema;