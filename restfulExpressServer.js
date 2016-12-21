'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const basicAuth = require('basic-auth');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.json());

 // ========<Authentication>=============
app.use((req, res, next) => {
  const credentials = basicAuth(req);

// eslint-disable-next-line max-statements
  if (credentials && credentials.name === 'admin' && credentials.pass === 'meowmix') {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Required"');
  res.sendStatus(401);
});

const create = require('./routes/create');
const get = require('./routes/get');
const update = require('./routes/update');
const destroy = require('./routes/destroy');

app.use(create);
app.use(get);
app.use(update);
app.use(destroy);

//  ==========< part of bonus for wrong path enter >==========
app.get('/boom', (_req, _res, next) => {
  next(new Error('BOOM!!!'));
});

app.use((req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.send(500);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port${port}`);
});

module.exports = app;
