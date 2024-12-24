//challengeSubmissionController.js
const challengeSubmissionController = {
    submit: async (req, res) => {
      try {
        const { challenge_id } = req.body;
        const user_id = req.user.id;
        const submission_file = req.file?.filename;
        const [result] = await db.query(
          'INSERT INTO challenge_submission (challenge_id, user_id, submission_file, status) VALUES (?, ?, ?, "submitted")',
          [challenge_id, user_id, submission_file]
        );
        res.status(201).json({ id: result.insertId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    grade: async (req, res) => {
      try {
        const { score, feedback } = req.body;
        await db.query(
          'UPDATE challenge_submission SET score = ?, feedback = ?, status = "reviewed" WHERE submission_id = ?',
          [score, feedback, req.params.id]
        );
        res.json({ message: 'Submission graded' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    getSubmissions: async (req, res) => {
      try {
        const [submissions] = await db.query(
          `SELECT cs.*, c.title FROM challenge_submission cs
           JOIN challenge c ON cs.challenge_id = c.challenge_id
           WHERE cs.user_id = ?`,
          [req.params.userId]
        );
        res.json(submissions);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
  
  //medicalHistoryController.js
  const medicalHistoryController = {
    create: async (req, res) => {
      try {
        const { disease_name, description } = req.body;
        const user_id = req.user.id;
        const [result] = await db.query(
          'INSERT INTO medical_history (user_id, disease_name, description) VALUES (?, ?, ?)',
          [user_id, disease_name, description]
        );
        res.status(201).json({ id: result.insertId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    getByUser: async (req, res) => {
      try {
        const [history] = await db.query(
          'SELECT * FROM medical_history WHERE user_id = ?',
          [req.params.userId]
        );
        res.json(history);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    update: async (req, res) => {
      try {
        const { disease_name, description } = req.body;
        await db.query(
          'UPDATE medical_history SET disease_name = ?, description = ? WHERE medical_history_id = ?',
          [disease_name, description, req.params.id]
        );
        res.json({ message: 'Medical history updated' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };