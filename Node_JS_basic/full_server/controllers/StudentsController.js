const { readDatabase } = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    readDatabase(process.argv[2])
      .then((fields) => {
        const message = 'This is the list of our students\n';
        let output = message;
        const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
        sortedFields.forEach((field) => {
          output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
        });
        res.status(200).send(output);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (['CS', 'SWE'].includes(major)) {
      readDatabase(process.argv[2])
        .then((fields) => {
          if (fields[major]) {
            res.status(200).send(`List: ${fields[major].join(', ')}`);
          } else {
            res.status(404).send('Major not found');
          }
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    } else {
      res.status(500).send('Major parameter must be CS or SWE');
    }
  }
}

module.exports = StudentsController;
