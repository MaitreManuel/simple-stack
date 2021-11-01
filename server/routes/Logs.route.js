const Router = require('express').Router();

const Logs = require('../controllers/Logs.controller');

module.exports = {
  init: app => {
    // Route principale pour récupérer les NotifToUser d'un utilisateur
    Router.route('/')
      .get(({}, res) => {
        Logs.getLogs()
          .then(logs => {
            res.status(200).send(logs);

          })
          .catch(error => {
            res.status(500).send({ error: { code: 'Internal Server Error', message: error, status: 500 } });
          })
        ;
      })
    ;

    app.use('/logs', Router);
  }
};
