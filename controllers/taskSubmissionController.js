//taskSubmissionController.js
const taskSubmissionController = {
    submit: async (req, res) => {
      try {
        const { task_id } = req.body;
        const user_id = req.user.id;
        const submission_file = req.file?.filename;
        const [result] = await db.query(
          'INSERT INTO task_submission (task_id, user_id, submission_file, status) VALUES (?, ?, ?, "submitted")',
          [task_id, user_id, submission_file]
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
          'UPDATE task_submission SET score = ?, feedback = ?, status = "reviewed" WHERE submission_id = ?',
          [score, feedback, req.params.id]
        );
        res.json({ message: 'Submission graded' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    getByUser: async (req, res) => {
      try {
        const [submissions] = await db.query(
          `SELECT ts.*, t.title FROM task_submission ts
           JOIN task t ON ts.task_id = t.task_id
           WHERE ts.user_id = ?`,
          [req.params.userId]
        );
        res.json(submissions);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };