const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2], (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Cannot load the database');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

app.listen(1245);

function countStudents(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(new Error('Cannot load the database'));
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
      callback(null, `Number of students: ${totalStudents}\n`);
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          callback(null, `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`);
        }
      }
    }
  });
}
