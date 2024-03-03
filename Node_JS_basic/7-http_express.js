#!/usr/bin/node
const express = require('express');
const fs = require('fs');

const app = express();
app.listen(1245);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  const fileName = process.argv[2];
  const message = 'This is the list of our students\n';
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      res.end('Cannot load the database');
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
      res.write(`${message}Number of students: ${totalStudents}\n`);
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          res.write(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`);
        }
      }
      res.end();
    }
  });
});

module.exports = app;
