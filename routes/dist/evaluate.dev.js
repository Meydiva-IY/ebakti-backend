"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Endpoint untuk evaluasi akhir


router.get('/final-evaluation', function (req, res) {
  var query = "\n        SELECT \n            p.profile_id,\n            p.full_name,\n            (SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) * 10) + \n            (4 - COUNT(a.attendance_id)) * 0 AS attendance_score,\n            COALESCE(SUM(ts.score), 0) * 0.6 AS task_score,\n            COALESCE(SUM(cs.score), 0) * 0.2 AS challenge_score,\n            ( \n                (SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) * 10) + \n                (COALESCE(SUM(ts.score), 0) * 0.6) + \n                (COALESCE(SUM(cs.score), 0) * 0.2)\n            ) AS final_score,\n            CASE \n                WHEN (\n                    (SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) * 10) + \n                    (COALESCE(SUM(ts.score), 0) * 0.6) + \n                    (COALESCE(SUM(cs.score), 0) * 0.2)\n                ) >= 75 THEN 'Lulus'\n                ELSE 'Tidak Lulus'\n            END AS status\n        FROM \n            profile p\n        LEFT JOIN \n            attendance a ON p.profile_id = a.profile_id\n        LEFT JOIN \n            task_submission ts ON p.profile_id = ts.profile_id\n        LEFT JOIN \n            challenge_submission cs ON p.profile_id = cs.profile_id\n        GROUP BY \n            p.profile_id;\n    ";
  db.query(query, function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
});
module.exports = router;
//# sourceMappingURL=evaluate.dev.js.map
