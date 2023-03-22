export function validateCake(schema) {
    return (req, res, next) => {
      const validation = schema.validate(req.body, { abortEarly: false });
      const errors = {};
  
      if (validation.error) {
        validation.error.details.forEach((err) => {
          if (err.path.includes("name")) {
            errors.name = err.message;
          }
          if (err.path.includes("image")) {
            errors.image = err.message;
          }
          if (err.path.includes("description")) {
            errors.description = err.message;
          }
          if (err.path.includes("price")) {
            errors.price = err.message;
          }
        });
      }
  
      if (Object.keys(errors).length > 0) {
        if (errors.image) {
          return res.status(422).send(errors);
        }
        if (errors.name) {
          return res.status(400).send(errors);
        }
        if (errors.price) {
            return res.status(400).send(errors);
        }
        if (errors.description) {
            return res.status(400).send(errors);
        }
      }
  
      next();
    };
  }
  