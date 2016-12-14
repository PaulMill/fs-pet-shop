#!/usr/bin/env node

/* eslint-disable no-console*/
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
     const ageVal = process.argv[3];
     const kindVal = process.argv[4];
     const nameVal = process.argv[5];

     if (ageVal && kindVal && nameVal) {
       const newObj = { age: ageVal, kind: kindVal, name: nameVal };

       console.log(newObj);
      //  pets.push(newObj);
      //  const petsJSON = JSON.stringify(pets);
       //
      //  fs.writeFile(petsPath, petsJSON, (writeErr) => {
      //    if (writeErr) {
      //      throw writeErr;
      //    }
      //  });
     }
     else {
       console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
       process.exit(1);
     }
   });
 }
 else if (cmd === 'update') {
   // eslint-disable next-line max-statement
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

 // Other way

 //
 // #!/usr/bin/env node
 //
 // /* eslint-disable no-console */
 //
 // 'use strict';
 //
 // const fs = require('fs');
 // const path = require('path');
 // const petsPath = path.join(__dirname, 'pets.json');
 //
 // const node = path.basename(process.argv[0]);
 // const file = path.basename(process.argv[1]);
 // const cmd = process.argv[2];
 //
 // if (cmd === 'read') {
 //   fs.readFile(petsPath, 'utf8', (err, data) => {
 //     if (err) {
 //       throw err;
 //     }
 //
 //     const index = Number.parseInt(process.argv[3]);
 //     const pets = JSON.parse(data);
 //
 //     if (Number.isNaN(index)) {
 //       console.log(pets);
 //       process.exit();
 //     }
 //
 //     if (index < 0 || index >= pets.length) {
 //       console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
 //       process.exit(1);
 //     }
 //
 //     console.log(pets[index]);
 //   });
 // }
 // else if (cmd === 'create') {
 //   fs.readFile(petsPath, 'utf8', (readErr, data) => {
 //     if (readErr) {
 //       throw readErr;
 //     }
 //
 //     const pets = JSON.parse(data);
 //     const age = Number.parseInt(process.argv[3]);
 //     const kind = process.argv[4];
 //     const name = process.argv[5];
 //
 //     if (Number.isNaN(age) || !kind || !name) {
 //       console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
 //       process.exit(1);
 //     }
 //
 //     const pet = { age, kind, name };
 //
 //     pets.push(pet);
 //
 //     const petsJSON = JSON.stringify(pets);
 //
 //     fs.writeFile(petsPath, petsJSON, (writeErr) => {
 //       if (writeErr) {
 //         throw writeErr;
 //       }
 //
 //       console.log(pet);
 //     });
 //   });
 // }
 // else if (cmd === 'update') {
 //   // eslint-disable-next-line max-statements
 //   fs.readFile(petsPath, 'utf8', (readErr, data) => {
 //     if (readErr) {
 //       throw readErr;
 //     }
 //
 //     const index = Number.parseInt(process.argv[3]);
 //     const pets = JSON.parse(data);
 //
 //     if (Number.isNaN(index) || index < 0 || index >= pets.length) {
 //       console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
 //       process.exit(1);
 //     }
 //
 //     const age = Number.parseInt(process.argv[4]);
 //     const kind = process.argv[5];
 //     const name = process.argv[6];
 //
 //     if (Number.isNaN(age) || !kind || !name) {
 //       console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
 //       process.exit(1);
 //     }
 //
 //     const pet = { age, kind, name };
 //
 //     pets[index] = pet;
 //
 //     const petsJSON = JSON.stringify(pets);
 //
 //     fs.writeFile(petsPath, petsJSON, (writeErr) => {
 //       if (writeErr) {
 //         throw writeErr;
 //       }
 //
 //       console.log(pet);
 //     });
 //   });
 // }
 // else if (cmd === 'destroy') {
 //   fs.readFile(petsPath, 'utf8', (readErr, data) => {
 //     if (readErr) {
 //       throw readErr;
 //     }
 //
 //     const index = Number.parseInt(process.argv[3]);
 //     const pets = JSON.parse(data);
 //
 //     if (Number.isNaN(index) || index < 0 || index >= pets.length) {
 //       console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
 //       process.exit(1);
 //     }
 //
 //     const pet = pets.splice(index, 1)[0];
 //     const petsJSON = JSON.stringify(pets);
 //
 //     fs.writeFile(petsPath, petsJSON, (writeErr) => {
 //       if (writeErr) {
 //         throw writeErr;
 //       }
 //
 //       console.log(pet);
 //     });
 //   });
 // }
 // else {
 //   console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
 //   process.exit(1);
 // }
