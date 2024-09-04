const express = require('express');
const server = express();

const pessoas = [{ nome: "André", id: 1 }, { nome: "Wallace", id: 2 }, { nome: "Breno", id: 3 }, { nome: "Aderbal", id: 4 }]
const pessoasJSON = JSON.stringify(pessoas);

server.get('/', (_request, response) => {
  response.status(200).end('Olá Mundo!')
})

server.get('/ping', (_request, response) => {
  response.status(200).end('pong')
})

server.get('/pessoas', (_request, response) => {
  response.status(200).end(pessoasJSON)
})

server.get('/pessoas/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const nomePuxado = pessoas.find(pessoa => pessoa.id === id)
  if (nomePuxado) {
    const nomePuxadoJSON = JSON.stringify(nomePuxado)
    response.status(200).end(nomePuxadoJSON)
  } else {
    response.status(404).end('Pessoa não encontrada')
  }
})

server.use((_request, response) => {
  response.status(404).end('Rota não encontrada')
})

server.listen(3000, () => console.log('Servidor rodando!'));





/* 
const http = require('http');
// Função de callback para lidar com as requisições
const requestListener = (req, res) => {
  // Verifica se a rota solicitada é "/ping"
  if (req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('pong'); // Responde com 'pong'
  }
  else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Olá Mundo!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Rota não encontrada'); // Responde com erro 404 para outras rotas
  }
};

// Cria o servidor
const server = http.createServer(requestListener);

// Define a porta do servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
*/