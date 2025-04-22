// Importa as bibliotecas
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

// Cria o servidor Express
const app = express();
const server = app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

// Configura o Socket.io para trabalhar com o servidor
const io = socketIo(server);

// Define a pasta "public" como a raiz do site
app.use(express.static(path.join(__dirname, 'public')));

// Lógica do chat (quando alguém se conecta)
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Quando o servidor recebe uma mensagem...
  socket.on('message', (data) => {
    // Envia a mensagem para TODOS os usuários
    io.emit('message', data);
  });

  // Quando alguém desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});