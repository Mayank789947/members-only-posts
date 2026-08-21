const { validationResult } = require("express-validator");

function handleValidationErrors(viewName, dataCallback) {
    return async (req, res, next) => {
       try {
         const errors = validationResult(req);
  
         if (errors.isEmpty()) {
            return next();
         }
  
         const extraData = dataCallback 
                           ? await dataCallback(req) 
                           : {};
  
         return res.render(viewName, {
           errors: errors.mapped(),
           values: req.body,
           ...extraData
         });
       } catch (error) {
         next(error);
       }
    };
}

module.exports = handleValidationErrors;
