#!/usr/bin/env node

/* eslint-disable no-console*/
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    const indexArr = process.argv[3];
    const pets = JSON.parse(data);

    if (err) {
      throw err;
    }
    else if (!indexArr) {
      console.log(pets);
    }
    else if (indexArr) {
      console.log(pets[parseInt([indexArr])]);
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const ageVal = parseInt(process.argv[3]);
    const kindVal = process.argv[4];
    const nameVal = process.argv[5];

    if (ageVal && kindVal && nameVal) {
      const newObj = { age: ageVal, kind: kindVal, name: nameVal };

      pets.push(newObj);
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        console.log(newObj);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
  });
}
else if (cmd === 'update') {
   // eslint-disable-next-line max-statements
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const petIndex = Number.parseInt(process.argv[3]);

    if (Number.isNaN(petIndex) || petIndex < 0 || petIndex >= pets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    const ageNum = Number.parseInt(process.argv[4]);
    const kindVal = process.argv[5];
    const nameVal = process.argv[6];

    if (petIndex && ageNum && kindVal && nameVal) {
      const pet = { age: ageNum, kind: kindVal, name: nameVal };

      pets[petIndex] = pet;
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        console.log(pet);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const petIndex = Number.parseInt(process.argv[3]);

    if (Number.isNaN(petIndex) || petIndex < 0 || petIndex >= pets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    const pet = pets.splice(petIndex, 1)[0];
    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
