require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('./controllers');
const { executeQuery } = require('./DB');
const createUsersTable = require('./queries/createUsersTable');

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true
  })
);

app.use(bodyParser.json());

app.use(router);

const server = http.createServer(app);

server.listen(port, async () => {
  await executeQuery(createUsersTable());

  console.log(`Server was running on port ${port}`);
});
