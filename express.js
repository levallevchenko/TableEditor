require('dotenv').config();
const express = require('express');
const app = express();
const DEFAULT_PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(DEFAULT_PORT, () => {
  console.log(`App running on port ${DEFAULT_PORT}.`);
});
