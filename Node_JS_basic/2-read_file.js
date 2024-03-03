// 2-read_file.js

const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    const students = lines.map(line => line.split(',')).filter(student => student.length === 4);

    if (students.length === 0) {
      throw new Error('Database is empty');
    }

    const fields = {};
    students.forEach(student => {
      const field = student[3];
      const name = student[0];
      if (fields[field]) {
        fields[field].count++;
        fields[field].students.push(name);
      } else {
        fields[field] = {
          count: 1,
          students: [name]
        };
      }
    });

    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].students.join(', ')}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('Cannot load the database');
    } else {
      throw error;
    }
  }
}

module.exports = countStudents;
