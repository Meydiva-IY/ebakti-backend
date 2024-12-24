"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var multer = require('multer'); // Tambahkan import multer


var app = express();
var PORT = process.env.PORT || 5000; // Middleware

app.use(cors());
app.use(bodyParser.json()); // Import Routes

var userRoutes = require('./routes/user');

var mentorRoutes = require('./routes/mentor');

var groupRoutes = require('./routes/group');

var periodRoutes = require('./routes/period');

var attendanceRoutes = require('./routes/attendance');

var medicalHistoryRoutes = require('./routes/medicalHistory');

var taskRoutes = require('./routes/task');

var challengeRoutes = require('./routes/challenge');

var groupMemberRoutes = require('./routes/groupMember');

var taskSubmissionRoutes = require('./routes/taskSubmission');

var challengeSubmissionRoutes = require('./routes/challengeSubmission');

var certificateRoutes = require('./routes/certificate'); // Pastikan rute ini ada


var evalRoutes = require('./routes/eval'); // Pastikan rute ini ada
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

app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=app.dev.js.map
