const mongoose = require('mongoose');
const Quiz = require('./Question');  // Le modèle Quiz est défini dans Question.js

describe('Quiz Model Test', () => {

    // Test 1: Vérifier la création et la sauvegarde d'un quiz complet
    it('should create & save a quiz successfully', async () => {
        const validQuiz = {
            quizTitle: "Quiz sur Michael Jackson",
            questions: [
                {
                    id: 1,
                    question: "En quelle année Michael Jackson est-il né ?",
                    options: ["1958", "1960", "1955", "1965"],
                    correctAnswer: "1958",
                    explanation: "Michael Jackson est né le 29 août 1958."
                }
            ],
            feedback: {
                perfect: {
                    comment: "Vous êtes le Roi de la Pop! 🤩",
                    image: "https://media.tenor.com/exQUnh3bRN0AAAAC/michael-jackson-dance.gif"
                },
                poor: {
                    comment: "Continuez à pratiquer!",
                    image: "https://example.com/practice.gif"
                }
            }
        };

        const savedQuiz = await new Quiz(validQuiz).save();

        expect(savedQuiz._id).toBeDefined();
        expect(savedQuiz.quizTitle).toBe(validQuiz.quizTitle);
        expect(savedQuiz.questions.length).toBe(1);
        expect(savedQuiz.feedback.perfect.comment).toBe(validQuiz.feedback.perfect.comment);
    });

    // Test 2: Vérifier que le quiz accepte des données minimales
    it('should create a quiz with minimal data', async () => {
        const minimalQuiz = {
            quizTitle: "Quiz Minimal",
            questions: [{
                question: "Question test ?",
                options: ["Option 1", "Option 2"],
                correctAnswer: "Option 1"
            }]
        };

        const savedQuiz = await new Quiz(minimalQuiz).save();
        expect(savedQuiz.quizTitle).toBe("Quiz Minimal");
        expect(savedQuiz.questions.length).toBe(1);
    });

    // Test 3: Vérifier que l'ajout de questions fonctionne
    it('should add questions to an existing quiz', async () => {
        const quiz = new Quiz({ quizTitle: "Quiz Évolutif" });
        await quiz.save();

        quiz.questions.push({
            question: "Nouvelle question ?",
            options: ["A", "B", "C"],
            correctAnswer: "B"
        });

        const updatedQuiz = await quiz.save();
        expect(updatedQuiz.questions.length).toBe(1);
        expect(updatedQuiz.questions[0].question).toBe("Nouvelle question ?");
    });

    // Test 4: Vérifier la mise à jour du titre du quiz
    it('should update quiz title', async () => {
        const quiz = await new Quiz({ quizTitle: "Ancien Titre" }).save();
        quiz.quizTitle = "Nouveau Titre";
        const updatedQuiz = await quiz.save();
        expect(updatedQuiz.quizTitle).toBe("Nouveau Titre");
    });

    // Test 5: Vérifier la suppression d'un quiz
    it('should delete a quiz', async () => {
        const quiz = await new Quiz({ quizTitle: "Quiz à Supprimer" }).save();
        await Quiz.deleteOne({ _id: quiz._id });
        const deletedQuiz = await Quiz.findById(quiz._id);
        expect(deletedQuiz).toBeNull();
    });

    // Test 6: Vérifier le comportement avec des données invalides
    it('should handle invalid data gracefully', async () => {
        const invalidQuiz = new Quiz({
            quizTitle: 123, // Devrait être une chaîne
            questions: "Pas un tableau" // Devrait être un tableau
        });

        await expect(invalidQuiz.validate()).rejects.toThrow();
    });
});