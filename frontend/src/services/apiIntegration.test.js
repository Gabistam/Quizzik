// Importe la fonction fetchQuiz depuis le fichier api.js
import { fetchQuiz } from './api';

// Crée un mock global pour la fonction fetch
// Cela permet de simuler les appels réseau sans faire de vraies requêtes HTTP
global.fetch = jest.fn();

// Groupe de tests pour les fonctions API du frontend
describe('API Frontend Tests', () => {
    // Avant chaque test, réinitialise tous les mocks
    // Cela assure que chaque test commence avec un état propre
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // Test pour vérifier si fetchQuiz fonctionne correctement
    it('should fetch quiz data successfully', async () => {
        // Crée des données mock pour simuler la réponse de l'API
        const mockQuizData = {
            quizTitle: "Test Quiz",
            questions: [{ id: 1, question: "Test Question" }]
        };

        // Configure le mock de fetch pour qu'il retourne les données mock
        // Simule une réponse HTTP réussie avec les données du quiz
        global.fetch.mockResolvedValueOnce({
            ok: true,  // Indique que la requête a réussi
            json: async () => mockQuizData  // Simule la méthode json() de la réponse
        });

        // Appelle la fonction fetchQuiz que nous testons
        const result = await fetchQuiz();

        // Vérifie que le résultat correspond aux données mock
        expect(result).toEqual(mockQuizData);

        // Vérifie que fetch a été appelé avec l'URL correcte
        // Utilise l'URL de l'API définie dans les variables d'environnement ou une URL par défaut
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/quiz`);
    });

});