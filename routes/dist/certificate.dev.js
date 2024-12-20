"use strict";

var express = require('express');

var router = express.Router();

var PDFDocument = require('pdfkit');

var fs = require('fs'); // Endpoint untuk menghasilkan sertifikat


router.post('/generate-certificate', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      status = _req$body.status;

  if (!name || !status) {
    return res.status(400).json({
      error: 'Name and status are required'
    });
  }

  var doc = new PDFDocument();
  var filePath = "./certificates/".concat(name.replace(/\s+/g, '_'), "_certificate.pdf");
  doc.pipe(fs.createWriteStream(filePath)); // Gambar latar belakang (pastikan gambar ada di path yang benar)

  doc.image('path/to/background-image.jpg', 0, 0, {
    width: 600
  }); // Teks Sertifikat

  doc.fontSize(25).text('Sertifikat Lulus', {
    align: 'center'
  });
  doc.moveDown();
  doc.fontSize(20).text("Diberikan kepada: ".concat(name), {
    align: 'center'
  });
  doc.moveDown();
  doc.fontSize(15).text("Status: ".concat(status), {
    align: 'center'
  });
  doc.end(); // Kirimkan respon setelah sertifikat dibuat

  res.json({
    message: 'Sertifikat berhasil dibuat',
    filePath: filePath
  });
});
module.exports = router;
//# sourceMappingURL=certificate.dev.js.map
