const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  
  socket.on('message', (data) => {
    io.emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});