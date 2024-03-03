// full_server/utils.js

import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n');
        const students = {};
        lines.forEach(line => {
          const [firstname, , , field] = line.split(',');
          if (field) {
            if (!students[field]) {
              students[field] = [];
            }
            students[field].push(firstname);
          }
        });
        resolve(students);
      }
    });
  });
}
