"use strict";

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var validateUser = [body('role').notEmpty().withMessage('Role is required'), body('email').isEmail().withMessage('Email is not valid'), body('password').isLength({
  min: 6
}).withMessage('Password must be at least 6 characters long')];

var handleValidationErrors = function handleValidationErrors(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  validateUser: validateUser,
  handleValidationErrors: handleValidationErrors
};
//# sourceMappingURL=validate.dev.js.map
