const express = require('express');
require('express-async-errors');
const loaders = require('./loaders');

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  const port = 80;

  app.listen(port, () => console.log(`Web listening on port ${port}!`));
}

startServer();