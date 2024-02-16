#!/usr/bin/node

const fs = require('fs');
const request = require('request');

// Obtén la URL de la solicitud y la ruta del archivo de los argumentos de la línea de comandos
const url = process.argv[2];
const filePath = process.argv[3];

// Realiza una solicitud GET a la URL proporcionada
request.get(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  // Escribe el contenido de la respuesta en el archivo especificado
  fs.writeFile(filePath, body, 'utf-8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    // Si la escritura se realizó correctamente, no se muestra ningún mensaje en la consola
  });
});
