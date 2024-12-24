// evalController.js
const db = require('../config/db');

const evalController = {
  calculateEvaluations: async (req, res) => {
    try {
      const query = `
        INSERT INTO final_evaluation (user_id, attendance_score, challenge_score, task_score, total_score)
        SELECT 
          u.user_id,
          (SUM(CASE 
            WHEN a.status = 'hadir' THEN 10
            WHEN a.status = 'izin' THEN 5
            ELSE 0
          END) / COUNT(DISTINCT a.attendance_id)) AS attendance_score,
          COALESCE(AVG(cs.score), 0) AS challenge_score,
          COALESCE(AVG(ts.score), 0) AS task_score,
          ((SUM(CASE 
            WHEN a.status = 'hadir' THEN 10
            WHEN a.status = 'izin' THEN 5
            ELSE 0
          END) / COUNT(DISTINCT a.attendance_id)) + 
          COALESCE(AVG(cs.score), 0) + 
          COALESCE(AVG(ts.score), 0)) AS total_score
        FROM user u
        LEFT JOIN attendance a ON u.user_id = a.user_id
        LEFT JOIN challenge_submission cs ON u.user_id = cs.user_id
        LEFT JOIN task_submission ts ON u.user_id = ts.user_id
        GROUP BY u.user_id`;

      await db.query(query);
      res.json({ message: 'Evaluations calculated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserEvaluation: async (req, res) => {
    try {
      const [evaluation] = await db.query(
        `SELECT fe.*, u.name, u.student_id, u.department 
         FROM final_evaluation fe
         JOIN user u ON fe.user_id = u.user_id
         WHERE fe.user_id = ?`,
        [req.params.userId]
      );
      if (!evaluation[0]) {
        return res.status(404).json({ message: 'Evaluation not found' });
      }
      res.json(evaluation[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllEvaluations: async (req, res) => {
    try {
      const [evaluations] = await db.query(
        `SELECT fe.*, u.name, u.student_id, u.department 
         FROM final_evaluation fe
         JOIN user u ON fe.user_id = u.user_id`
      );
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  evalController
};