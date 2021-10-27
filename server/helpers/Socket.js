const expressStatusMonitor = require('express-status-monitor');

const AddLog = require('../controllers/Logs.controller').addLog;
const Bucket = require('./Bucket');
const Datetime = require('./Date').datetime();

let io;

module.exports = {
  listen: (server, app) => {
    // Initialisation des sockets
    io = require('socket.io')(server, {
      cors: {
        origin: '*'
      }
    });

    // Force express à utiliser les websockets de socket.io et non les siens
    app.use(expressStatusMonitor({
      websocket: io,
      port: app.get('port')
    }));

    // Ecoute du socket 'connection' pour initialiser les sockets d'écoute
    io.on('connection', socket => {
      // Socket d'écoute pour enregistrer les adresses de socket, les identifiants de connection
      // et les identifiants des utilisateurs
      socket.on('reload', () => {
        const USER = {
          date: Datetime,
          idUser: process.env.IDENTITY,
          socket: socket.id
        };

        AddLog({
          date: USER.date,
          idUser: USER.idUser,
          type: 'reload'
        });

        // Sauvegarde des identifiants de connexion d'un utilisateur
        Bucket.addUser(USER);

        // Emission du socket pour notifié le client (l'utilisateur en soit) qu'il est bien connecté
        socket.emit('reloaded');
      });
    });

    return io;
  },

  // Fonction générique pour envoyer des données par socket à un utilisateur spécifié
  send: (socketid, notif) => {
    if (Bucket.ifSocketExists(socketid)) {
      io.to(socketid).emit('new notif', notif);
    }
  }
};
