import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Processa o JSON da requisição
  await json(req, res);

  // Encontra a rota correspondente
  const route = routes.find(
    (route) => route.method === method && route.path === url
  );

  if (route) {
    // Chama o manipulador da rota
    return route.handler(req, res);
  }

  // Caso nenhuma rota seja encontrada
  return res.writeHead(404).end('Not Found');
});

const port = 3333;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
