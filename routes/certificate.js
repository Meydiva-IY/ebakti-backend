const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Endpoint untuk menghasilkan sertifikat
router.post('/generate-certificate', (req, res) => {
    const { name, status } = req.body;

    if (!name || !status) {
        return res.status(400).json({ error: 'Name and status are required' });
    }

    const doc = new PDFDocument();
    const filePath = `./certificates/${name.replace(/\s+/g, '_')}_certificate.pdf`;

    doc.pipe(fs.createWriteStream(filePath));

    // Gambar latar belakang (pastikan gambar ada di path yang benar)
    doc.image('path/to/background-image.jpg', 0, 0, { width: 600 });

    // Teks Sertifikat
    doc.fontSize(25).text('Sertifikat Lulus', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`Diberikan kepada: ${name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(`Status: ${status}`, { align: 'center' });

    doc.end();

    // Kirimkan respon setelah sertifikat dibuat
    res.json({ message: 'Sertifikat berhasil dibuat', filePath });
});

module.exports = router;