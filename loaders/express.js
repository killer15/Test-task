const express = require('express');
const Airtable = require('airtable');
global.base = new Airtable({apiKey: 'keynanssAKxqTocud'}).base('appKI65qh6aG4ux0m');

module.exports = ({ app }) => {

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(`${process.cwd()}/public`, {maxAge: 3456700000}));
  app.set('view engine', 'ejs');

  global.modules = `${process.cwd()}/modules`;

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ errorCode: 'Oops! Something went wrong' });
  });

  // ...More middlewares

  return app;
};