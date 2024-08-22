// Importation des dépendances nécessaires
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';  // Importe les matchers personnalisés pour Jest
import Quiz from '../components/Quiz';
import { fetchQuiz } from '../services/api';

// Mocke le module api pour contrôler son comportement dans les tests
jest.mock('../services/api', () => ({
  fetchQuiz: jest.fn(),
}));

// Groupe de tests pour le composant Quiz
describe('Quiz Component', () => {
  // Test spécifique : vérifier l'affichage du titre du quiz après chargement
  it('should display the quiz title when loaded', async () => {
    // Préparation des données mock pour simuler la réponse de l'API
    const mockQuiz = {
      quizTitle: "Test Quiz Title",
      questions: [
        {
          id: 1,
          question: "What is React?",
          options: ["A JavaScript library", "A programming language", "A database", "A server"],
          correctAnswer: "A JavaScript library",
          explanation: "React is a JavaScript library for building user interfaces."
        }
      ],
      feedback: {
        perfect: { comment: "Perfect!", image: "perfect.gif" },
        poor: { comment: "Keep practicing!", image: "poor.gif" }
      }
    };

    // Configure le mock de fetchQuiz pour retourner les données mock
    fetchQuiz.mockResolvedValue(mockQuiz);

    // Rend le composant Quiz dans un environnement de test
    render(<Quiz />);

    // Attend que le titre du quiz soit affiché dans le document
    // Cette attente est nécessaire car le chargement du quiz est asynchrone
    await waitFor(() => {
      // Vérifie que le titre du quiz est présent dans le document
      expect(screen.getByText("Test Quiz Title")).toBeInTheDocument();
    });
  });
});