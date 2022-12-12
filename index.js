const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8888",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log("Client Connected")

  io.emit('message', "Welcome");

  socket.on('message', (msg) => {
    console.log(`Received message "${msg}", emitting to client`)
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log("Client Disconnected")
  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});
