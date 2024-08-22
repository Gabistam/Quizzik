const request = require('supertest');
const mongoose = require('mongoose');
const { app, startServer, closeServer } = require('../app');
const Quiz = require('../models/Question');
const connectDB = require('../config/db');

describe('Quiz Routes Integration Tests', () => {
    beforeAll(async () => {
        await connectDB();
        await startServer();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await closeServer();
    });

    beforeEach(async () => {
        await Quiz.deleteMany({});
    });

    // Test 1: Tester la récupération d'un quiz existant
    it('should retrieve an existing quiz', async () => {
        const testQuiz = new Quiz({
            quizTitle: "Test API Quiz",
            questions: [{
                id: 1,
                question: "What is an API?",
                options: ["Application Programming Interface", "Automated Program Instruction", "Advanced Programming Integration", "Application Process Integration"],
                correctAnswer: "Application Programming Interface",
                explanation: "API stands for Application Programming Interface."
            }],
            feedback: {
                perfect: { comment: "API Master!", image: "api_master.gif" }
            }
        });
        await testQuiz.save();

        const response = await request(app).get('/api/quiz');
        expect(response.status).toBe(200);
        expect(response.body.quizTitle).toBe("Test API Quiz");
        expect(response.body.questions).toHaveLength(1);
        expect(response.body.questions[0].question).toBe("What is an API?");
    });

    // Test 2: Tester le cas où aucun quiz n'est trouvé
    it('should return 404 when no quiz is found', async () => {
        const response = await request(app).get('/api/quiz');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Aucun quiz trouvé");
    });

    // Test 3: Tester la gestion des erreurs serveur
    it('should handle server errors', async () => {
        // Simuler une erreur de base de données
        jest.spyOn(Quiz, 'findOne').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(app).get('/api/quiz');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Database error");
    });
});
