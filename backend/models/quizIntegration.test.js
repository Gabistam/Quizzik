const mongoose = require('mongoose');
const Quiz = require('../models/Question');
const connectDB = require('../config/db');
const { app, startServer, closeServer } = require('../app');

describe('Quiz Integration Tests', () => {
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

    // Test 1: Vérifier la connexion à la base de données
    it('should connect to the database successfully', () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 signifie 'connected'
    });

    // Test 2: Créer et sauvegarder un quiz complet
    it('should create and save a complete quiz successfully', async () => {
        const quizData = {
            quizTitle: "Test Integration Quiz",
            questions: [{
                id: 1,
                question: "What is integration testing?",
                options: ["Unit testing", "API testing", "Testing multiple components together", "UI testing"],
                correctAnswer: "Testing multiple components together",
                explanation: "Integration testing verifies that different parts of the system work together correctly."
            }],
            feedback: {
                perfect: { comment: "Perfect score!", image: "perfect.gif" },
                excellent: { comment: "Excellent job!", image: "excellent.gif" },
                good: { comment: "Good effort!", image: "good.gif" },
                average: { comment: "Not bad!", image: "average.gif" },
                poor: { comment: "Keep practicing!", image: "poor.gif" }
            }
        };

        const quiz = new Quiz(quizData);
        const savedQuiz = await quiz.save();

        expect(savedQuiz._id).toBeDefined();
        expect(savedQuiz.quizTitle).toBe(quizData.quizTitle);
        expect(savedQuiz.questions).toHaveLength(1);
        expect(savedQuiz.feedback.perfect.comment).toBe("Perfect score!");
    });

    // Test 3: Récupérer un quiz de la base de données
    it('should retrieve a quiz from the database and verify its structure', async () => {
        const quizData = {
            quizTitle: "Retrieved Quiz",
            questions: [{
                id: 1,
                question: "What is Mongoose?",
                options: ["A programming language", "An ORM for MongoDB", "A database", "A testing framework"],
                correctAnswer: "An ORM for MongoDB",
                explanation: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js."
            }],
            feedback: {
                perfect: { comment: "MongoDB Master!", image: "mongodb_master.gif" }
            }
        };

        await new Quiz(quizData).save();

        const retrievedQuiz = await Quiz.findOne({ quizTitle: "Retrieved Quiz" });
        expect(retrievedQuiz).not.toBeNull();
        expect(retrievedQuiz.questions[0].question).toBe("What is Mongoose?");
        expect(retrievedQuiz.feedback.perfect.comment).toBe("MongoDB Master!");
    });

    // Test 4: Mettre à jour un quiz existant
    it('should update an existing quiz', async () => {
        const quiz = new Quiz({
            quizTitle: "Quiz to Update",
            questions: [{
                id: 1,
                question: "Original Question",
                options: ["Option 1", "Option 2"],
                correctAnswer: "Option 1",
                explanation: "Original explanation"
            }]
        });
        await quiz.save();

        quiz.quizTitle = "Updated Quiz Title";
        quiz.questions[0].question = "Updated Question";
        await quiz.save();

        const updatedQuiz = await Quiz.findOne({ _id: quiz._id });
        expect(updatedQuiz.quizTitle).toBe("Updated Quiz Title");
        expect(updatedQuiz.questions[0].question).toBe("Updated Question");
    });
});
