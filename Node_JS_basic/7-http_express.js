const express = require('express');
const fs = require('fs');

const app = express();

// Define port
const PORT = 1245;

// Route for /
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route for /students
app.get('/students', async (req, res) => {
  try {
    const data = await countStudents('database.csv');
    res.send('This is the list of our students\n' + data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Function to count students
async function countStudents(path) {
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
        let result = `Number of students: ${totalStudents}\n`;
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            result += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
          }
        }
        resolve(result);
      }
    });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
