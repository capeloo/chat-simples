// Conecta ao servidor Socket.io
const socket = io();

// Pega os elementos do HTML
const messages = document.getElementById('messages');
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');

// Quando o formulário é enviado...
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recarregar a página
  if (input.value) {
    // Envia a mensagem para o servidor
    socket.emit('message', input.value);
    input.value = ''; // Limpa o campo
  }
});

// Quando recebe uma mensagem do servidor...
socket.on('message', (msg) => {
  // Cria um elemento <div> para a mensagem
  const item = document.createElement('div');
  item.textContent = msg;
  messages.appendChild(item); // Adiciona ao chat
  messages.scrollTop = messages.scrollHeight; // Rolagem automática
});