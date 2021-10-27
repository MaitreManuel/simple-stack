// Importantion des variables d'environnement
require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
// const mongoose = require('mongoose');

const APP = express();
// const DB_LINK = 'mongodb+srv://cluster0.uwbvh.mongodb.net/beealive';
const SERVER = require('http').Server(APP);
const SERVER_PORT = process.env.PORT || 4555;

// Plug-in pour parser les requêtes POST et récupérer les champs d'une requête
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect(DB_LINK, {
//   auth: {
//     authSource: 'admin',
//     username: 'bee',
//     password: 'beerules'
//   },
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//   console.warn('Mongoose connected');
// });
//
// mongoose.connection.on('disconnected', () => {
//   console.error('Mongoose disconnected');
// });
//
// mongoose.connection.on('error', () => {
//   console.error('Mongoose connection error');
// });

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

SERVER.listen(SERVER_PORT, () => {
  console.log(`Server servin' from good ol' port ${ SERVER_PORT }`); // eslint-disable-line no-console
  console.log(new Date().toString()); // eslint-disable-line no-console
});
