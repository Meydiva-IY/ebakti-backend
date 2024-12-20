"use strict";

var jwt = require('jsonwebtoken');

var authenticateToken = function authenticateToken(req, res, next) {
  var token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken: authenticateToken
};
//# sourceMappingURL=auth.dev.js.map
