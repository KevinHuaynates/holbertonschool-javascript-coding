#!/usr/bin/node
// Importa el módulo fs
const fs = require('fs');

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

  // Si no hay errores, imprime la confirmación
  console.log(content);
});
