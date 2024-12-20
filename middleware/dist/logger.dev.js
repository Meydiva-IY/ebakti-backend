"use strict";

var logger = function logger(req, res, next) {
  console.log("".concat(req.method, " ").concat(req.url, " - ").concat(new Date().toISOString()));
  next();
};

module.exports = logger;
//# sourceMappingURL=logger.dev.js.map
