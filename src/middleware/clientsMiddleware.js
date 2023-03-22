export function validateClients(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error) {
            const errorMessages = validation.error.details.map(err => err.message)
            return res.status(400).send(errorMessages)
        }
        next()
    }
}