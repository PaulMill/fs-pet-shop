 'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const pet = process.argv[3];
let pets = [];
if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    pets = JSON.parse(data);
    if (err) {
      throw err;
    } else if (!pet){
      console.log(pets);
    }
    else if (pet) {
      console.log(pets[parseInt([pet])]);
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
    pets = JSON.parse(data);
    const key = process.argv[4];
    const value = process.argv[5];

    if (pet && key && value) {
      const petNumber = parseInt(pet);
      const newObj = { age: petNumber, kind: key, name: value };
      console.log(newObj);
      pets.push(newObj);
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
      });
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
