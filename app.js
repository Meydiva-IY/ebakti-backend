const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const mentorRoutes = require('./routes/mentor');
const groupRoutes = require('./routes/group');
const periodRoutes = require('./routes/period');
const attendanceRoutes = require('./routes/attendance');
const medicalHistoryRoutes = require('./routes/medicalHistory');
const taskRoutes = require('./routes/task');
const challengeRoutes = require('./routes/challenge');
const notificationRoutes = require('./routes/notification');
const groupMemberRoutes = require('./routes/groupMember'); // Import GroupMember routes
const taskSubmissionRoutes = require('./routes/taskSubmission'); // Import TaskSubmission routes
const challengeSubmissionRoutes = require('./routes/challengeSubmission'); // Import ChallengeSubmission routes

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/periods', periodRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/medicalHistories', medicalHistoryRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/groupMembers', groupMemberRoutes); // Use GroupMember routes
app.use('/api/taskSubmissions', taskSubmissionRoutes); // Use TaskSubmission routes
app.use('/api/challengeSubmissions', challengeSubmissionRoutes); // Use ChallengeSubmission routes

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});