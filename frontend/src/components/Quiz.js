import React, { useState, useEffect } from 'react';
import { fetchQuiz } from '../services/api';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz();
        setQuiz(data);
        setLoading(false);
      } catch (e) {
        setError('Impossible de charger le quiz. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };
    loadQuiz();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer('');
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getFeedback = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage === 100) return quiz.feedback.perfect;
    if (percentage >= 90) return quiz.feedback.excellent;
    if (percentage >= 80) return quiz.feedback.veryGood;
    if (percentage >= 70) return quiz.feedback.good;
    if (percentage >= 60) return quiz.feedback.average;
    return quiz.feedback.poor;
  };

  if (loading) return <div className="text-center py-10 text-violet-600">Chargement du quiz...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!quiz) return null;

  if (showResult) {
    const feedback = getFeedback();
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-violet-600">Quiz terminé!</h2>
        <p className="text-xl mb-4">Votre score: {score} / {quiz.questions.length}</p>
        <p className="text-lg mb-4">{feedback.comment}</p>
        <img src={feedback.image} alt="Feedback GIF" className="mx-auto mb-4 rounded-lg" />
        <button 
          onClick={() => window.location.reload()} 
          className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition duration-300 w-full"
        >
          Recommencer le quiz
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

return (
    <div className="bg-violet-100 p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto" style={{ opacity: 0.95 }}>
        <h2 className="text-2xl text-center font-bold mb-4 text-violet-600">{quiz.quizTitle}</h2>
        <p className="text-lg mb-4 text-gray-600">Question {currentQuestion + 1} / {quiz.questions.length}</p>
        <p className="text-xl mb-6">{question.question}</p>
        <div className="space-y-4">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-center p-4 rounded-full transition duration-300 ${
                        selectedAnswer === option
                            ? 'bg-violet-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
        {selectedAnswer && (
            <div className="mt-6 p-4 bg-gray-50 rounded-full">
                <p className="mb-2 font-bold">
                    {selectedAnswer === question.correctAnswer 
                        ? '✅ Correct!' 
                        : '❌ Incorrect. La bonne réponse était: ' + question.correctAnswer}
                </p>
                <p className="italic text-gray-600">{question.explanation}</p>
            </div>
        )}
        <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`mt-6 px-6 py-3 rounded-full w-full ${
                selectedAnswer
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition duration-300`}
        >
            {currentQuestion + 1 === quiz.questions.length ? 'Terminer' : 'Suivant'}
        </button>
    </div>
);
};

export default Quiz;