// full_server/controllers/StudentsController.js

import { readDatabase } from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase('database.csv');
      let response = 'This is the list of our students\n';
      Object.entries(students).forEach(([field, names]) => {
        response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major.toUpperCase();
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase('database.csv');
      if (!students[major]) {
        return res.status(200).send('No students found for this major');
      }
      const response = `List: ${students[major].join(', ')}`;
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
