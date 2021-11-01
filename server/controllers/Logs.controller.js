const LogsModel = require('../models/Logs.model');

module.exports = {
  addLog: log => {
    LogsModel.create(log, (error, log) => {
      if (error) {
        console.error(error, log);
      }
    });
  },

  getLogs: () => new Promise((resolve, reject) => {
    LogsModel.find({}, (error, logs) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      resolve(logs);
    });
  })
};
