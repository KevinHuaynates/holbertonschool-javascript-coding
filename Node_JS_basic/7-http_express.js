const express = require('express');
const { countStudents } = require('./3-read_file_async');
const fs = require('fs');

const app = express();

const PORT = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const database = req.query.database;
  if (!database) {
    return res.status(500).send('Database file not provided');
  }

  countStudents(database)
    .then(() => {
      const data = fs.readFileSync(database, 'utf8');
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
