'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, '../pets.json');

const express = require('express');
const router = express.Router();

//  ==========< post element to json file >==========
router.post('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const pets = JSON.parse(petsJSON);
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;

    if (Number.isNaN(age) || !kind || !name) {
      return res.sendStatus(400);
    }
    const pet = { age, kind, name };

    pets.push(pet);
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(pet);
    });
  });
});

module.exports = router;
