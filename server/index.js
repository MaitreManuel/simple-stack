// Importation des variables d'environnement
require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Datetime = require('./helpers/Date').datetime();

const APP = express();
const MONGO_URL = process.env.MONGO_URL;
const SERVER = require('http').Server(APP);
const SERVER_PORT = process.env.PORT || 4555;

// Plug-in pour parser les requêtes POST et récupérer les champs d'une requête
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, {
  auth: {
    authSource: 'admin',
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
  },
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
  console.warn('Mongoose connected');

  require('./routes/Logs.route').init(APP);
});

mongoose.connection.on('disconnected', () => {
  console.error('Mongoose disconnected');
});

mongoose.connection.on('error', () => {
  console.error('Mongoose connection error');
});

// Configuration des headers pour accepter les requetes
APP.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

// Route principale du serveur Node pour tester s'il fonctionne
APP.get('/', (req, res) => {
  res.send('Path /');
});

// Importation de l'initialisation des sockets
require('./helpers/Socket').listen(SERVER, APP);

SERVER.listen(SERVER_PORT, () => {
  console.log(`Server servin' from good ol' port ${ SERVER_PORT }`); // eslint-disable-line no-console
  console.log(Datetime); // eslint-disable-line no-console
});
