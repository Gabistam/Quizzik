// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');
// Importe le modèle Quiz défini dans le fichier Question.js
const Quiz = require('./Question');

// Groupe de tests pour le modèle Quiz
describe('Quiz Model Test', () => {

    // Test 1: Vérifier la création et la sauvegarde d'un quiz complet
    it('should create & save a quiz successfully', async () => {
        // Définit un objet quiz valide avec toutes les propriétés nécessaires
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

        // Crée une nouvelle instance de Quiz et la sauvegarde dans la base de données
        const savedQuiz = await new Quiz(validQuiz).save();

        // Vérifie que le quiz sauvegardé a un ID (a été correctement sauvegardé)
        expect(savedQuiz._id).toBeDefined();
        // Vérifie que le titre du quiz sauvegardé correspond au titre original
        expect(savedQuiz.quizTitle).toBe(validQuiz.quizTitle);
        // Vérifie que le quiz a bien une question
        expect(savedQuiz.questions.length).toBe(1);
        // Vérifie que le commentaire de feedback "perfect" correspond à l'original
        expect(savedQuiz.feedback.perfect.comment).toBe(validQuiz.feedback.perfect.comment);
    });

    // Test 2: Vérifier que le quiz accepte des données minimales
    it('should create a quiz with minimal data', async () => {
        // Définit un objet quiz avec seulement les données essentielles
        const minimalQuiz = {
            quizTitle: "Quiz Minimal",
            questions: [{
                question: "Question test ?",
                options: ["Option 1", "Option 2"],
                correctAnswer: "Option 1"
            }]
        };

        // Sauvegarde le quiz minimal
        const savedQuiz = await new Quiz(minimalQuiz).save();
        // Vérifie que le titre est correct
        expect(savedQuiz.quizTitle).toBe("Quiz Minimal");
        // Vérifie qu'il y a bien une question
        expect(savedQuiz.questions.length).toBe(1);
    });

    // Test 3: Vérifier que l'ajout de questions fonctionne
    it('should add questions to an existing quiz', async () => {
        // Crée un nouveau quiz avec juste un titre
        const quiz = new Quiz({ quizTitle: "Quiz Évolutif" });
        await quiz.save();

        // Ajoute une nouvelle question au quiz
        quiz.questions.push({
            question: "Nouvelle question ?",
            options: ["A", "B", "C"],
            correctAnswer: "B"
        });

        // Sauvegarde le quiz mis à jour
        const updatedQuiz = await quiz.save();
        // Vérifie qu'il y a maintenant une question
        expect(updatedQuiz.questions.length).toBe(1);
        // Vérifie que la question ajoutée est correcte
        expect(updatedQuiz.questions[0].question).toBe("Nouvelle question ?");
    });

    // Test 4: Vérifier la mise à jour du titre du quiz
    it('should update quiz title', async () => {
        // Crée et sauvegarde un quiz avec un titre initial
        const quiz = await new Quiz({ quizTitle: "Ancien Titre" }).save();
        // Change le titre
        quiz.quizTitle = "Nouveau Titre";
        // Sauvegarde les modifications
        const updatedQuiz = await quiz.save();
        // Vérifie que le titre a bien été mis à jour
        expect(updatedQuiz.quizTitle).toBe("Nouveau Titre");
    });

    // Test 5: Vérifier la suppression d'un quiz
    it('should delete a quiz', async () => {
        // Crée et sauvegarde un quiz
        const quiz = await new Quiz({ quizTitle: "Quiz à Supprimer" }).save();
        // Supprime le quiz
        await Quiz.deleteOne({ _id: quiz._id });
        // Essaie de retrouver le quiz supprimé
        const deletedQuiz = await Quiz.findById(quiz._id);
        // Vérifie que le quiz n'existe plus (null)
        expect(deletedQuiz).toBeNull();
    });

    // Test 6: Vérifier le comportement avec des données invalides
    it('should handle invalid data gracefully', async () => {
        // Crée un quiz avec des données invalides
        const invalidQuiz = new Quiz({
            quizTitle: 123, // Devrait être une chaîne
            questions: "Pas un tableau" // Devrait être un tableau
        });

        // Vérifie que la validation du quiz invalide lance une erreur
        await expect(invalidQuiz.validate()).rejects.toThrow();
    });
});