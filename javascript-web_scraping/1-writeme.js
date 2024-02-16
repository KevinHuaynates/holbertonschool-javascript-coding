#!/usr/bin/node

const fs = require('fs');

// Verifica si se proporcionan los argumentos necesarios
if (process.argv.length !== 4) {
  console.error('Usage: ./1-writeme.js <file-path> "<string-to-write>"');
  process.exit(1);
}

// Obtiene la ruta del archivo y el contenido a escribir de los argumentos de la línea de comandos
const filePath = process.argv[2];
const content = process.argv[3];

// Escribe el contenido en el archivo especificado
fs.writeFile(filePath, content, 'utf-8', (err) => {
  // Maneja los errores, si los hay
  if (err) {
    console.error(err);
    return;
  }

  // Lee el contenido del archivo recién escrito y lo imprime
  fs.readFile(filePath, 'utf-8', (readErr, data) => {
    if (readErr) {
      console.error(readErr);
      return;
    }
    console.log(data.trim()); // Elimina espacios en blanco alrededor del contenido
  });
});
