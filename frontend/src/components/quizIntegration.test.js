import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Quiz from '../components/Quiz';
import { handlers } from '../mocks/handlers';

// Configuration du serveur mock avec MSW
const server = setupServer(...handlers);

// Configuration globale pour les tests
beforeAll(() => server.listen());  // Démarre le serveur mock avant tous les tests
afterEach(() => server.resetHandlers());  // Réinitialise les gestionnaires après chaque test
afterAll(() => server.close());  // Ferme le serveur mock après tous les tests

describe('Quiz Component Integration Tests', () => {
  // Test 1 : Chargement et affichage correct du quiz
  it('should load and display the quiz correctly', async () => {
    render(<Quiz />);  // Rend le composant Quiz
    
    // Vérifie que le message de chargement est affiché
    expect(screen.getByText('Chargement du quiz...')).toBeInTheDocument();
    
    // Attend que le quiz soit chargé et vérifie son titre
    await waitFor(() => {
      expect(screen.getByText('Test Integration Quiz')).toBeInTheDocument();
    });
    
    // Vérifie que la première question et une option sont affichées
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript library')).toBeInTheDocument();
  });

  // Test 2 : Gestion des interactions utilisateur et affichage des résultats
  it('should handle user interactions and show results', async () => {
    render(<Quiz />);
    
    // Attend que le quiz soit chargé
    await waitFor(() => {
      expect(screen.getByText('Test Integration Quiz')).toBeInTheDocument();
    });
    
    // Simule la réponse à la première question
    userEvent.click(screen.getByText('A JavaScript library'));
    expect(screen.getByText('✅ Correct!')).toBeInTheDocument();
    userEvent.click(screen.getByText('Suivant'));
    
    // Simule la réponse à la deuxième question
    userEvent.click(screen.getByText('A JSON format'));
    expect(screen.getByText('❌ Incorrect. La bonne réponse était: A JavaScript extension')).toBeInTheDocument();
    userEvent.click(screen.getByText('Terminer'));
    
    // Vérifie l'affichage des résultats
    expect(screen.getByText('Quiz terminé!')).toBeInTheDocument();
    expect(screen.getByText('Votre score: 1 / 2')).toBeInTheDocument();
    expect(screen.getByText('Good effort!')).toBeInTheDocument();
  });

  // Test 3 : Gestion des erreurs API
  it('should handle API errors gracefully', async () => {
    // Remplace le gestionnaire pour simuler une erreur serveur
    server.use(
      rest.get('*/api/quiz', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<Quiz />);
    
    // Vérifie que le message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText('Impossible de charger le quiz. Veuillez réessayer plus tard.')).toBeInTheDocument();
    });
  });
});