'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, '../pets.json');

const express = require('express');
const router = express.Router();

//  ==========< update element on json file >==========
router.patch('/pets/:id', (req, res, next) => {
  // eslint-disable-next-line max-statements
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    const age = Number.parseInt(req.body.age);
    const { kind, name } = req.body;

    if (!Number.isNaN(age)) {
      pets[id].age = age;
    }
    if (kind) {
      pets[id].kind = kind;
    }
    if (name) {
      pets[id].name = name;
    }

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(pets[id]);
    });
  });
});

module.exports = router;
