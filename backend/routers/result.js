const express = require('express');
const router = express.Router();
const pool = require('../configure/db');

// Save a quiz result
router.post('/', async (req, res) => {
    const { user_id, quiz_id, score, total_questions } = req.body;

    if (!user_id || !quiz_id || score === undefined || !total_questions) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO results (user_id, quiz_id, score, total_questions) VALUES (?, ?, ?, ?)',
            [user_id, quiz_id, score, total_questions]
        );
        res.status(201).json({ message: 'Result saved', result_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all results for a specific user
router.get('/user/:user_id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT r.result_id, r.score, r.total_questions, r.submitted_at, q.title
             FROM results r
             JOIN quizzes q ON r.quiz_id = q.quiz_id
             WHERE r.user_id = ?
             ORDER BY r.submitted_at DESC`,
            [req.params.user_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;