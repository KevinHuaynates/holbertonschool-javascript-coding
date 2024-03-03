// 2-read_file.js

const fs = require('fs');

function countStudents(path) {
  try {
    // Lee el archivo de manera síncrona
    const data = fs.readFileSync(path, 'utf8');

    // Divide el archivo en líneas
    const lines = data.split('\n').filter(line => line.trim() !== ''); // Ignora líneas vacías

    // Inicializa contadores para cada campo
    const counters = {};

    // Itera sobre cada línea del archivo
    lines.forEach(line => {
      const [, , , field] = line.split(','); // Ignora el primer campo (nombre) y el segundo campo (apellido)
      if (counters[field]) {
        counters[field]++;
      } else {
        counters[field] = 1;
      }
    });

    // Imprime el número total de estudiantes
    const totalStudents = lines.length;
    console.log(`Number of students: ${totalStudents}`);

    // Imprime el número de estudiantes en cada campo y su lista de nombres
    Object.entries(counters).forEach(([field, count]) => {
      const studentsList = lines
        .filter(line => line.split(',')[3] === field) // Filtra las líneas por campo
        .map(line => line.split(',')[0]); // Extrae los nombres de los estudiantes
      console.log(`Number of students in ${field}: ${count}. List: ${studentsList.join(', ')}`);
    });
  } catch (error) {
    // Captura y maneja cualquier error al leer el archivo
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
