const express = require("express");
const helmet = require("helmet");

const knex = require("knex");
const knexconfig = require("./knexfile");

const db = knex(knexconfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error });
    });
});
server.get("/zoos/:id", (req, res) => {
  const zooID = req.params.id;
  db("zoos")
    .where({ id: zooID })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: `Zoo with ID: ${id} not found.` });
      }
    })
    .catch(err => {
      res.status(500).json({ error });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
