 'use strict';

 const fs = require('fs');
 const path = require('path');
 const petsPath = path.join(__dirname, 'pets.json');

 const node = path.basename(process.argv[0]);
 const file = path.basename(process.argv[1]);
 const cmd = process.argv[2];
 let pets = [];

 if (cmd === 'read') {
   fs.readFile(petsPath, 'utf8', (err, data) => {
     const indexArr = process.argv[3];

     pets = JSON.parse(data);
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
     const ageNum = process.argv[3];

     pets = JSON.parse(data);
     const key = process.argv[4];
     const value = process.argv[5];

     if (ageNum && key && value) {
       const petNumber = parseInt(ageNum);
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
 }
 else if (cmd === 'update') {
   fs.readFile(petsPath, 'utf8', (readErr, data) => {
     if (readErr) {
       throw readErr;
     }
     pets = JSON.parse(data);
     const petIndex = process.argv[3];
     const ageNum = process.argv[4];
     const kindVal = process.argv[5];
     const nameVal = process.argv[6];

     if (petIndex && ageNum && kindVal && nameVal) {
       const petIndexNum = parseInt(petIndex);
       const ageNumNum = parseInt(ageNum);
       const newObj = { age: ageNumNum, kind: kindVal, name: nameVal };

       console.log(newObj);

       pets.splice(petIndexNum, 1, newObj);
       const petsJSON = JSON.stringify(pets);

       fs.writeFile(petsPath, petsJSON, (writeErr) => {
         if (writeErr) {
           throw writeErr;
         }
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
     pets = JSON.parse(data);
     const petIndex = process.argv[3];

     if (petIndex) {
       const petIndexNum = parseInt(petIndex);
       console.log(pets[petIndexNum]);
       pets.splice(petIndexNum, 1);
       const petsJSON = JSON.stringify(pets);

       fs.writeFile(petsPath, petsJSON, (writeErr) => {
         if (writeErr) {
           throw writeErr;
         }
       });
     }
     else {
       console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
       process.exit(1);
     }
   });
 }

 else {
   console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
   process.exit(1);
 }
