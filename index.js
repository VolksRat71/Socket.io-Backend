const express = require('express');
const ws = require('ws');
const testData = require("./testData.json")

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {
  let seconds = 0
  const myInterval = setInterval(timerRun, 1000);

  function timerRun() {
    seconds = seconds += 1
    if (seconds === 600) timerStop()

    socket.send(JSON.stringify(testData[seconds]))
  }

  function timerStop() {
    clearInterval(myInterval);
  }
});

const server = app.listen(3000);

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
