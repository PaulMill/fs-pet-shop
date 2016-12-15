'use strict'
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error(readErr.stack);

      res.sendStatus(500);
      return;
    }
    const pets = JSON.parse(data);
    res.send(pets);
  });
});
app.get('/pets/:name', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, dataName) => {
    if (readErr) {
      console.error(readErr.stack);
      res.sendStatus(500);
      return;
    }
    const name = req.params.name;
    console.log(name);
    const pets = JSON.parse(dataName);
    const regExp = /([a-zA-Z])/;

    if (name.test(regExp)) {
      console.log('Hello');
      return;
    }
    // console.error(pets);
    res.send(pets.name);
  });
});
app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
