'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, '../pets.json');

const express = require('express');
const router = express.Router();

//  ==========< get all elements on json file >==========
router.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

//  ==========< get one element of json file >==========
router.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const pets = JSON.parse(petsJSON);
    const id = Number.parseInt(req.params.id);

    if (id < 0 || Number.isNaN(id) || id >= pets.length) {
      return res.sendStatus(404);
    }
    res.send(pets[id]);
  });
});

module.exports = router;
