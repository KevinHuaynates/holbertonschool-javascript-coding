const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n');
        const students = lines.map((line) => line.split(','));
        const fields = {};
        students.forEach((student) => {
          if (student.length === 4 && student[0] !== 'firstname') {
            const field = student[3];
            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(student[0]);
          }
        });

        const totalStudents = students.length - 1;
        console.log(`Number of students: ${totalStudents}`);
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
