'use strict';
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
    res.set('Content-Type', 'application/json');
    res.send(petsJSON);
  });
});

app.post('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    const age = Number.parseInt(req.body.age);
    const { kind, name } = req.body;

    if (age && kind && name) {
      const newPet = { age, kind, name };

      pets.push(newPet);
      const newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }
        res.set('Content-Type', 'text/plain');
        res.send(newPet);
      });
    }
    else {
      return res.sendStatus(400);
    }
  });
});
app.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }
    const pet = pets[id];

    res.send(pet);
  });
});
app.patch('/pets/:id', (req, res, next) => {
  // eslint-disable-next-line max-statements
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(400);
    }
    const { age, kind, name } = req.body;
    const updateInfo = { age, kind, name };

    if (age) {
      pets[id].age = parseInt(updateInfo.age);
    }
    if (kind) {
      pets[id].kind = updateInfo.kind;
    }
    if (name) {
      pets[id].name = updateInfo.name;
    }
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(updateInfo);
    });
  });
});
app.delete('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      // eslint-disable-next-line no-console
      console.error(400);

      return res.sendStatus(400);
    }
    const newPets = pets.splice(id, 1)[0];
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        // eslint-disable-next-line no-console
        console.error(500);

        return next(writeErr);
      }
      res.send(newPets);
    });
  });
});
app.get('/boom', (_req, _res, next) => {
  next(new Error('BOOM!!!'));
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);

  return res.sendStatus(500);
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
