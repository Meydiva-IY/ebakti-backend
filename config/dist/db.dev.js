"use strict";

var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // Ganti dengan username database Anda
  password: '',
  // Ganti dengan password database Anda
  database: 'ebakti'
});
db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('MySQL Connected...');
});
module.exports = db;
//# sourceMappingURL=db.dev.js.map
