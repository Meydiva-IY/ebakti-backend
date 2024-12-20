"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();
var PORT = process.env.PORT || 5000; // Middleware

app.use(cors());
app.use(bodyParser.json()); // Import Routes

var userRoutes = require('./routes/user');

var profileRoutes = require('./routes/profile');

var mentorRoutes = require('./routes/mentor');

var groupRoutes = require('./routes/group');

var periodRoutes = require('./routes/period');

var attendanceRoutes = require('./routes/attendance');

var medicalHistoryRoutes = require('./routes/medicalHistory');

var taskRoutes = require('./routes/task');

var challengeRoutes = require('./routes/challenge');

var notificationRoutes = require('./routes/notification');

var groupMemberRoutes = require('./routes/groupMember'); // Import GroupMember routes


var taskSubmissionRoutes = require('./routes/taskSubmission'); // Import TaskSubmission routes


var challengeSubmissionRoutes = require('./routes/challengeSubmission'); // Import ChallengeSubmission routes
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

app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=app.dev.js.map
