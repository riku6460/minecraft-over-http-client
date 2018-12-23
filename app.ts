declare interface Config {
  address: string;
  port: number;
}

const config: Config = require('./config.json');

require('net').createServer(socket => {

  const io = require('socket.io-client')(config.address);

  io.on('disconnect', () => socket.end());
  socket.on('end', () => io.disconnect());

  io.on('msg', data => socket.write(data));

  socket.on('data', data => io.emit('msg', data));

}).listen(config.port);
