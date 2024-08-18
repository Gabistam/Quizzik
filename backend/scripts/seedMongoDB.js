require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('../models/Question');

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;


const michaelJacksonQuiz = {
  quizTitle: "Quiz sur Michael Jackson",
  questions: [
    {
      id: 1,
      question: "En quelle année Michael Jackson est-il né ?",
      options: ["1958", "1960", "1955", "1965"],
      correctAnswer: "1958",
      explanation: "Michael Jackson est né le 29 août 1958."
    },
    {
      id: 2,
      question: "Quel est le titre de son premier album solo ?",
      options: ["Thriller", "Off the Wall", "Bad", "Dangerous"],
      correctAnswer: "Off the Wall",
      explanation: "Le premier album solo de Michael Jackson est 'Off the Wall', sorti en 1979."
    },
    {
      id: 3,
      question: "Quelle chanson de Michael Jackson a été utilisée pour une campagne Pepsi ?",
      options: ["Billie Jean", "Bad", "Black or White", "Beat It"],
      correctAnswer: "Billie Jean",
      explanation: "La chanson 'Billie Jean' a été utilisée pour une campagne publicitaire de Pepsi."
    },
    {
      id: 4,
      question: "Dans quel groupe Michael Jackson a-t-il commencé sa carrière ?",
      options: ["The Commodores", "The Temptations", "The Jackson 5", "Boyz II Men"],
      correctAnswer: "The Jackson 5",
      explanation: "Michael Jackson a commencé sa carrière avec ses frères dans le groupe 'The Jackson 5'."
    },
    {
      id: 5,
      question: "Quel est le nom du ranch de Michael Jackson ?",
      options: ["Wonderland", "Dreamland", "Neverland", "Fantasyland"],
      correctAnswer: "Neverland",
      explanation: "Le ranch de Michael Jackson est appelé 'Neverland', en référence au pays imaginaire de Peter Pan."
    },
    {
      id: 6,
      question: "Quel est le nom de son album le plus vendu ?",
      options: ["Bad", "Off the Wall", "Thriller", "Dangerous"],
      correctAnswer: "Thriller",
      explanation: "'Thriller' est l'album le plus vendu de tous les temps."
    },
    {
      id: 7,
      question: "Quel est le nom de son chimpanzé de compagnie ?",
      options: ["George", "Bubbles", "Charlie", "Max"],
      correctAnswer: "Bubbles",
      explanation: "Le chimpanzé de compagnie de Michael Jackson s'appelait Bubbles."
    },
    {
      id: 8,
      question: "Dans quelle ville est né Michael Jackson ?",
      options: ["Los Angeles", "Chicago", "New York", "Gary"],
      correctAnswer: "Gary",
      explanation: "Michael Jackson est né à Gary, dans l'Indiana."
    },
    {
      id: 9,
      question: "Quel est le nom de son dernier album studio ?",
      options: ["Invincible", "HIStory", "Bad", "Dangerous"],
      correctAnswer: "Invincible",
      explanation: "Le dernier album studio de Michael Jackson est 'Invincible', sorti en 2001."
    },
    {
      id: 10,
      question: "Quelle est la danse signature de Michael Jackson ?",
      options: ["Le Twist", "Le Moonwalk", "Le Macarena", "Le Tango"],
      correctAnswer: "Le Moonwalk",
      explanation: "La danse signature de Michael Jackson est le Moonwalk."
    }
  ],
  feedback: {
    perfect: {
      comment: "Vous êtes le Roi de la Pop! 🤩",
      image: "https://media.tenor.com/exQUnh3bRN0AAAAC/michael-jackson-dance.gif"
    },
    excellent: {
      comment: "Vous êtes un véritable Moonwalker! 🌕",
      image: "https://media.tenor.com/D1m8DTJLf-EAAAAC/moon-walk-michael-jackson.gif"
    },
    veryGood: {
      comment: "Thriller n'a aucun secret pour vous! 🧟‍♂️",
      image: "https://gifdb.com/images/high/michael-jackson-groovy-zombie-dance-y0hz3yrg03i91zth.gif"
    },
    good: {
      comment: "Vous connaissez bien le King of Pop! 🎤",
      image: "https://www.icegif.com/wp-content/uploads/2023/01/icegif-376.gif"
    },
    average: {
      comment: "Il est temps de réviser les albums de MJ! 🎵",
      image: "https://i.pinimg.com/originals/44/ae/f0/44aef0e27f645cb7adebf21dfa41aeb5.gif"
    },
    poor: {
      comment: "Hee-hee! Vous avez besoin de pratiquer! 🕺",
      image: "https://i.makeagif.com/media/5-29-2015/ieEayC.gif"
    }
  },
};

const seedMongoDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connecté à MongoDB Atlas');
  
      // Supprime tous les quiz existants dans la collection
      await Quiz.deleteMany({});
      console.log('Quiz existants supprimés');
  
      // Insère le nouveau quiz
      const newQuiz = new Quiz(michaelJacksonQuiz);
      await newQuiz.save();
      console.log('Nouveau quiz inséré avec succès');
  
    } catch (error) {
      console.error(`Erreur lors de la connexion ou de l'insertion des données:`, error);
    } finally {
      await mongoose.disconnect();
      console.log('Déconnecté de MongoDB Atlas');
    }
  };
  
  seedMongoDB();