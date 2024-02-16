// Importa el módulo fs
const fs = require('fs');

// Obtiene el nombre del archivo del primer argumento de la línea de comandos
const filePath = process.argv[2];

// Lee el contenido del archivo especificado
fs.readFile(filePath, 'utf-8', (err, data) => {
  // Maneja los errores, si los hay
  if (err) {
    console.error(err);
    return;
  }

  // Imprime el contenido del archivo
  console.log(data);
});
