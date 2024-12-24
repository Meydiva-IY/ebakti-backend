// certificateController.js
const PDFDocument = require('pdfkit');

const certificateController = {
  generateCertificate: async (req, res) => {
    try {
      const userId = req.params.userId;
      
      const [evaluation] = await db.query(
        `SELECT fe.*, u.name, u.student_id, u.department, p.period_name 
         FROM final_evaluation fe
         JOIN user u ON fe.user_id = u.user_id
         JOIN period p ON p.period_id = 
           (SELECT MAX(period_id) FROM period)
         WHERE fe.user_id = ? AND fe.total_score >= 75`,
        [userId]
      );

      if (!evaluation[0]) {
        return res.status(404).json({ message: 'User not eligible for certificate' });
      }

      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4'
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 
        `attachment; filename=certificate_${evaluation[0].student_id}.pdf`);

      doc.pipe(res);

      // Certificate design
      doc.fontSize(30)
         .text('CERTIFICATE OF COMPLETION', { align: 'center' })
         .moveDown()
         .fontSize(20)
         .text(`This certifies that`)
         .moveDown()
         .fontSize(25)
         .text(evaluation[0].name, { align: 'center' })
         .moveDown()
         .fontSize(15)
         .text(`has successfully completed the BAKTI Program ${evaluation[0].period_name}`, 
           { align: 'center' })
         .moveDown()
         .text(`Student ID: ${evaluation[0].student_id}`)
         .text(`Department: ${evaluation[0].department}`)
         .moveDown()
         .text(`Final Score: ${evaluation[0].total_score}`);

      doc.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  checkEligibility: async (req, res) => {
    try {
      const [eligible] = await db.query(
        `SELECT COUNT(*) as isEligible 
         FROM final_evaluation 
         WHERE user_id = ? AND total_score >= 75`,
        [req.params.userId]
      );
      res.json({ isEligible: eligible[0].isEligible > 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  certificateController
};