const mongoose = require('mongoose');

const LOGS_SCHEMA = new mongoose.Schema({
  date: {
    required: true,
    type: String
  },

  idUser: {
    required: true,
    type: String
  },

  type: {
    required: true,
    type: String
  }
}, { collection: 'logs' });

class LogsClass {
  getId () {
    return this._id;
  }

  getDate () {
    return this.date;
  }

  getidUser () {
    return this.idUser;
  }

  getType () {
    return this.type;
  }
}

LOGS_SCHEMA.loadClass(LogsClass);
module.exports = mongoose.model('Logs', LOGS_SCHEMA);
