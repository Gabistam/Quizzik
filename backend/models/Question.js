const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String
});

const feedbackSchema = new mongoose.Schema({
  comment: String,
  image: String
});

const quizSchema = new mongoose.Schema({
  quizTitle: String,
  questions: [questionSchema],
  feedback: {
    perfect: feedbackSchema,
    excellent: feedbackSchema,
    veryGood: feedbackSchema,
    good: feedbackSchema,
    average: feedbackSchema,
    poor: feedbackSchema
  }
});

module.exports = mongoose.model('Quiz', quizSchema);