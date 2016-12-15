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

// get all
app.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    res.send(petsJSON);
  });
});

app.post('/post', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    const id = Number.parseInt(req.body.id);
    const { kind, name } = req.body;

    if (id && kind && name) {
      const newPet = { id, kind, name };
      pets.push(newPet[id]);
      const newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }
        res.send('Content-Type' 'text-plain');
        res.send(newPet);
      });
    }
    else {
      console.error();
      return res.sendStatus(400);
    }
  });
});

app.use((req, res,) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
