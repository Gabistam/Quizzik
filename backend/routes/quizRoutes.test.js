const request = require('supertest');
const express = require('express');
const Quiz = require('../models/Question');
const quizRoutes = require('../routes/quizRoutes');

// Mocke le modèle Quiz
jest.mock('../models/Question');

const app = express();
app.use(express.json());
app.use('/api/quiz', quizRoutes);

describe('Quiz Routes Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve a quiz successfully', async () => {
    const mockQuiz = {
      quizTitle: "Test Quiz",
      questions: [{ question: "Test Question" }]
    };

    Quiz.findOne.mockResolvedValue(mockQuiz);

    const response = await request(app).get('/api/quiz');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockQuiz);
    expect(Quiz.findOne).toHaveBeenCalled();
  });

  it('should return 404 when no quiz is found', async () => {
    Quiz.findOne.mockResolvedValue(null);

    const response = await request(app).get('/api/quiz');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Aucun quiz trouvé" });
  });

  it('should handle errors', async () => {
    const error = new Error('Database error');
    Quiz.findOne.mockRejectedValue(error);

    const response = await request(app).get('/api/quiz');

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: error.message });
  });
});