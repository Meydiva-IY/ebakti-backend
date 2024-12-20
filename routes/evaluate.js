const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint untuk evaluasi akhir
router.get('/final-evaluation', (req, res) => {
    const query = `
        SELECT 
            p.profile_id,
            p.full_name,
            (SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) * 10) + 
            (4 - COUNT(a.attendance_id)) * 0 AS attendance_score,
            COALESCE(SUM(ts.score), 0) * 0.6 AS task_score,
            COALESCE(SUM(cs.score), 0) * 0.2 AS challenge_score,
            ( 
                (SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) * 10) + 
                (COALESCE(SUM(ts.score), 0) * 0.6) + 
                (COALESCE(SUM(cs.score), 0) * 0.2)
            ) AS final_score,
            CASE 
                WHEN (
                    (SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) * 10) + 
                    (COALESCE(SUM(ts.score), 0) * 0.6) + 
                    (COALESCE(SUM(cs.score), 0) * 0.2)
                ) >= 75 THEN 'Lulus'
                ELSE 'Tidak Lulus'
            END AS status
        FROM 
            profile p
        LEFT JOIN 
            attendance a ON p.profile_id = a.profile_id
        LEFT JOIN 
            task_submission ts ON p.profile_id = ts.profile_id
        LEFT JOIN 
            challenge_submission cs ON p.profile_id = cs.profile_id
        GROUP BY 
            p.profile_id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;