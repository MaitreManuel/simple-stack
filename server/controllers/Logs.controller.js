const LogsModel = require('../models/Logs.model');

module.exports = {
  addLog: log => {
    LogsModel.create(log, (error, log) => {
      if (error) {
        console.error(error);
      }

      console.log('SAVED');
      console.log(log);
    });
  }
};
