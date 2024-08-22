import { fetchQuiz } from './api';

// Mock de fetch
global.fetch = jest.fn();

describe('API Frontend Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // Test existant pour fetchQuiz
    it('should fetch quiz data successfully', async () => {
        const mockQuizData = {
            quizTitle: "Test Quiz",
            questions: [{ id: 1, question: "Test Question" }]
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockQuizData
        });

        const result = await fetchQuiz();

        expect(result).toEqual(mockQuizData);
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/quiz`);
    });

});
