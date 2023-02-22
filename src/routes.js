import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";


const db = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {

            const { search } = req.query;

            const users = db.select("users", search ? {
                name: search,
                email: search
            } : null);

            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body;

            const user = {
                id: randomUUID(),
                name,
                email,
            };

            db.insert("users", user);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { name, email } = req.body;

            db.update('users', id, { name, email });

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            db.delete('users', id);

            return res.writeHead(204).end();
        }
    }
];