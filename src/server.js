import http from "node:http";
import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { json } from "./middlewares/json.js";

const db = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(db.select("users")));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    db.insert("users", user);

    return res.writeHead(201).end();
  }

  res.writeHead(404).end();
});

server.listen(3333);
