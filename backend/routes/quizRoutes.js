const express = require('express');
const router = express.Router();
const Quiz = require('../models/Question');

// Get the quiz
router.get('/', async (req, res) => {
  try {
    const quiz = await Quiz.findOne();
    if (!quiz) {
      return res.status(404).json({ message: "Aucun quiz trouvé" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;