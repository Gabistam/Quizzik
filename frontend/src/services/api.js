const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchQuiz = async () => {
  try {
    const response = await fetch(`${API_URL}/api/quiz`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération du quiz:", error);
    throw error;
  }
};

// Vous pouvez ajouter d'autres fonctions pour d'autres appels API ici