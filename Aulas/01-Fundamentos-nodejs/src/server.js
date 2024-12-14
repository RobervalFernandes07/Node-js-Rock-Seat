import http from 'node:http';
import { json } from './middlewares/json.js';


const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req,res)

  if (method === 'GET' && url === '/users') {
    // Early return
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    if (!body || !body.name || !body.email) {
      // Retorna erro se o corpo for inválido
      return res.writeHead(400, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ error: 'Invalid body format' }));
    }

    const { name, email } = body;

    users.push({
      id: users.length + 1, // Incrementa o ID automaticamente
      name,
      email,
    });

    return res.writeHead(201).end(); // Retorna código 201 Created
  }

  // Caso nenhuma rota seja encontrada
  return res.writeHead(404).end();
});

const port = 3333; // ou 8080
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
