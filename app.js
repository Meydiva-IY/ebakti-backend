const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Tambahkan import multer

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const userRoutes = require('./routes/user');
const mentorRoutes = require('./routes/mentor');
const groupRoutes = require('./routes/group');
const periodRoutes = require('./routes/period');
const attendanceRoutes = require('./routes/attendance');
const medicalHistoryRoutes = require('./routes/medicalHistory');
const taskRoutes = require('./routes/task');
const challengeRoutes = require('./routes/challenge');
const groupMemberRoutes = require('./routes/groupMember');
const taskSubmissionRoutes = require('./routes/taskSubmission');
const challengeSubmissionRoutes = require('./routes/challengeSubmission');
const certificateRoutes = require('./routes/certificate'); // Pastikan rute ini ada
const evalRoutes = require('./routes/eval'); // Pastikan rute ini ada

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/periods', periodRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/medicalHistories', medicalHistoryRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/groupMembers', groupMemberRoutes);
app.use('/api/taskSubmissions', taskSubmissionRoutes);
app.use('/api/challengeSubmissions', challengeSubmissionRoutes);
app.use('/api/certificates', certificateRoutes); // Tambahkan rute untuk certificate
app.use('/api/evals', evalRoutes); // Tambahkan rute untuk eval

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});