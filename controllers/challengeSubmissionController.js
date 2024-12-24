// challengeSubmissionController.js
const db = require('../config/db');

const challengeSubmissionController = {
    submit: async (req, res) => {
        try {
            const { challenge_id } = req.body; // Get challenge_id from the request body
            const user_id = req.user.id; // Get user_id from the authenticated user
            const submission_file = req.file?.filename; // Get the uploaded file name if it exists

            // Insert the submission into the database
            const [result] = await db.query(
                'INSERT INTO challenge_submission (challenge_id, user_id, submission_file, status) VALUES (?, ?, ?, "submitted")',
                [challenge_id, user_id, submission_file]
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
                'UPDATE challenge_submission SET score = ?, feedback = ?, status = "reviewed" WHERE submission_id = ?',
                [score, feedback, req.params.id] // Update the submission with the given ID
            );

            res.json({ message: 'Submission graded' }); // Respond with a success message
        } catch (error) {
            res.status(500).json({ error: error.message }); // Handle errors
        }
    },

    getSubmissions: async (req, res) => {
        try {
            const [submissions] = await db.query(
                `SELECT cs.*, c.title FROM challenge_submission cs
                 JOIN challenge c ON cs.challenge_id = c.challenge_id
                 WHERE cs.user_id = ?`, // Get submissions for the specified user
                [req.params.userId]
            );

            res.json(submissions); // Respond with the list of submissions
        } catch (error) {
            res.status(500).json({ error: error.message }); // Handle errors
        }
    }
};

module.exports = { challengeSubmissionController }; // Export the controller