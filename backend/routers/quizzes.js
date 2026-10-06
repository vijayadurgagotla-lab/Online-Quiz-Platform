const express = require('express');
const router = express.Router();
const pool = require('../configure/db');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const [quizzes] = await pool.query('SELECT * FROM quizzes');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get questions for a specific quiz
router.get('/:id/questions', async (req, res) => {
  try {
    const [questions] = await pool.query(
      'SELECT question_id, question_text, option_a, option_b, option_c, option_d, correct_answer FROM questions WHERE quiz_id = ?',
      [req.params.id]
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;