const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
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

        // Combine content into a single string
        const response = `This is the list of our students\n` +
                         `Number of students: ${totalStudents}\n`;
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            response += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
          }
        }

        res.end(response);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
