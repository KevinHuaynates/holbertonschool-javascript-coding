const http = require('http');
const fs = require('fs');

const readFile = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  );

const countStudents = async path => {
  const data = await readFile(path);
  const lines = data.trim().split('\n');
  const students = lines.map(line => line.split(','));
  const fields = {};
  students.forEach(student => {
    if (student.length === 4 && student[0] !== 'firstname') {
      const field = student[3];
      if (!fields[field]) fields[field] = [];
      fields[field].push(student[0]);
    }
  });
  const totalStudents = students.length - 1;
  console.log(`Number of students: ${totalStudents}`);
  for (const field in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      console.log(
        `Number of students in ${field}: ${fields[field].length}. List: ${fields[
          field
        ].join(', ')}`
      );
    }
  }
};

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.setHeader('Content-Type', 'text/plain');
    res.end(await countStudents(process.argv[2]));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

app.listen(1245);
module.exports = app;
