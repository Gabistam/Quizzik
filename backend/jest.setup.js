const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

beforeAll(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connecté à MongoDB Atlas pour les tests');
  } catch (error) {
    console.error("Erreur de connexion à MongoDB Atlas", error);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});