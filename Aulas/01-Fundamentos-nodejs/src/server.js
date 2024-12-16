import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from './middlewares/json.js';
import { DataBase } from './database.js';

const database = new DataBase();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Processa o JSON da requisição
  await json(req, res);

  // Acessa o corpo da requisição
  const body = req.body;

  if (method === 'GET' && url === '/users') {
    const users = database.select('users');
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    if (!body || !body.name || !body.email) {
      // Retorna erro se o corpo for inválido
      return res
        .writeHead(400, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ error: 'Invalid body format' }));
    }

    const { name, email } = body;

    const users = database.select('users') || []; // Obtém os usuários existentes
    const user = {
      id: randomUUID(),
      name,
      email,
    };

    database.insert('users', user);

    return res.writeHead(201).end(); // Retorna código 201 Created
  }

  // Caso nenhuma rota seja encontrada
  return res.writeHead(404).end();
});

const port = 3333;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
