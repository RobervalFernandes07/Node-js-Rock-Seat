import path from 'node:path';
import { DataBase } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new DataBase();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath ('/users'),
    handler: (req, res) => {
      const users = database.select('users');

      return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath ('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return res.writeHead(201).end(); // Retorna código 201 Created
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath ('/users/:id'),
    handler: (req, res) => {
        return res.end()
    }
  }
];
