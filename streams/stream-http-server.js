import http from "node:http";
import { Transform } from "node:stream";

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  //Leitura completa do arquivo antes da transformação.

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const allBufferContent = Buffer.concat(buffers).toString();

  console.log(allBufferContent);

  return res.end(allBufferContent);

  //Retorno parcial dos dados lidos.
  // return req.pipe(new InvertNumberStream()).pipe(res);
});

server.listen(3334);
