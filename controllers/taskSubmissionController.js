// taskSubmissionController.js
const db = require('../config/db');

const taskSubmissionController = {
    submit: async (req, res) => {
        try {
            const { task_id } = req.body; // Get task_id from the request body
            const user_id = req.user.id; // Get user_id from the authenticated user
            const submission_file = req.file?.filename; // Get the uploaded file name if it exists

            // Insert the submission into the database
            const [result] = await db.query(
                'INSERT INTO task_submission (task_id, user_id, submission_file, status) VALUES (?, ?, ?, "submitted")',
                [task_id, user_id, submission_file]
            );

            res.status(201).json({ id: result.insertId }); // Respond with the ID of the new submission
        } catch (error) {
            res.status(500).json({ error: error.message }); // Handle errors
        }
    },

    grade: async (req, res) => {
        try {
            const { score, feedback } = req.body; // Get score and feedback from the request body
            await db.query(
                'UPDATE task_submission SET score = ?, feedback = ?, status = "reviewed" WHERE submission_id = ?',
                [score, feedback, req.params.id] // Update the submission with the given ID
            );

            res.json({ message: 'Submission graded' }); // Respond with a success message
        } catch (error) {
            res.status(500).json({ error: error.message }); // Handle errors
        }
    },

    getByUser: async (req, res) => { // Corrected function name
        try {
            const [submissions] = await db.query(
                `SELECT ts.*, t.title FROM task_submission ts
                 JOIN task t ON ts.task_id = t.task_id
                 WHERE ts.user_id = ?`, // Get submissions for the specified user
                [req.params.userId]
            );

            res.json(submissions); // Respond with the list of submissions
        } catch (error) {
            res.status(500).json({ error: error.message }); // Handle errors
        }
    }
};

module.exports = { taskSubmissionController }; // Export the controller
