import socket from 'socket.io-client';

const io = socket(process.env.REACT_APP_API_URL, {
  transports: ['websocket', 'polling', 'flashsocket']
});

export default io;
