const bucket = {};

module.exports = {
  addUser: user => {
    bucket[user.id] = user;
  },

  getBucket: () => {
    return bucket;
  },

  getSocketByIdUser: idUser => {
    if (module.exports.ifUserExists(idUser)) {
      return module.exports.getUser(idUser).socket;
    } else {
      return false;
    }
  },

  getUser: idUser => {
    if (module.exports.ifUserExists(idUser)) {
      return bucket[idUser];
    } else {
      return false;
    }
  },

  ifSocketExists: idSocket => {
    let buffer = false;

    for (const idUser in bucket) {
      if (bucket[idUser].socket === idSocket) {
        buffer = true;
        break;
      }
    }

    return buffer;
  },

  ifUserExists: idUser => {
    return !!bucket[idUser];
  }
};
