declare interface Config {
  address: string;
  port: number;
}

const config: Config = require('./config.json');

require('net').createServer(socket => {

  const WebSocketClient = require('websocket').client;
  const ws = new WebSocketClient();
  ws.connect(config.address);

  ws.on('connect', connection => {
    connection.on('close', () => socket.end());
    socket.on('end', () => connection.close());

    connection.on('message', data => {
      if (data.type === 'binary' && data.binaryData instanceof Buffer) {
        socket.write(data.binaryData);
      } else {
        socket.end();
        connection.close();
      }
    });

    socket.on('data', data => connection.send(data));
  })

}).listen(config.port);
