const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');

const io = socketIo.listen(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT,() => {
  console.log("running")
})

app.use(express.static(__dirname + "/public"))

io.on('connection', (socket) => {
  socket.on('desenhar', (linha) => {
    io.emit('desenhar', linha)
  })
})
