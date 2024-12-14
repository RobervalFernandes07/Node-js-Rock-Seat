import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
   _transform(chunk, encoding, callback) {
      // Converte o chunk para string e inverte o número
      const transformed = Number(chunk.toString()) * -1;
      console.log(transformed);  // Apenas para debug

      // Passa o número invertido para o próximo estágio do stream
      callback(null, Buffer.from(String(transformed)));
   }
}

// Criando o servidor HTTP
const server = http.createServer((req, res) => {
   // Configura o cabeçalho da resposta
   res.writeHead(200, { 'Content-Type': 'text/plain' });

   // Usando o pipe para transformar os dados da requisição
   req
      .pipe(new InverseNumberStream())  // Transforma os dados usando o InverseNumberStream
      .pipe(res);  // Passa a resposta transformada para o cliente
});

// Inicia o servidor na porta 3334
server.listen(3334, () => {
   console.log('Servidor rodando em http://localhost:3334');
});
 