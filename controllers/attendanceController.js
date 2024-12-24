// attendanceController.js
const attendanceController = {
    create: async (req, res) => {
      try {
        const { group_id, period_id, status, location } = req.body;
        const user_id = req.user.id;
        const selfie_image = req.file?.filename;
  
        const [result] = await db.query(
          `INSERT INTO attendance (group_id, period_id, user_id, status, selfie_image, location, date) 
           VALUES (?, ?, ?, ?, ?, ?, CURDATE())`,
          [group_id, period_id, user_id, status, selfie_image, location]
        );
        res.status(201).json({ id: result.insertId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
  
  // groupController.js
  const groupController = {
    create: async (req, res) => {
      try {
        const { group_name, mentor1_id, mentor2_id } = req.body;
        const [result] = await db.query(
          'INSERT INTO `group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)',
          [group_name, mentor1_id, mentor2_id]
        );
        res.status(201).json({ id: result.insertId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };

  module.exports = {
    attendanceController
  };