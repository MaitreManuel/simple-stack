import io from 'socket.io-client';

class Socket {
  constructor () {
    if (!!Socket.instance) {
      return Socket.instance;
    }

    Socket.instance = this;
    this._socket = io(`${ process.env.NODE_URL }`);

    return this;
  }

  getSocket () {
    return this._socket;
  }

  set
}

export default Socket;
