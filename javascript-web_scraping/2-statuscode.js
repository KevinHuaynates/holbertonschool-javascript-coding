#!/usr/bin/node
const request = require('request');

// Obtén la URL de la solicitud de los argumentos de la línea de comandos
const url = process.argv[2];

// Realiza una solicitud GET a la URL proporcionada
request.get(url, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }

  // Obtiene el código de estado de la respuesta
  const statusCode = response && response.statusCode;

  // Imprime el código de estado
  console.log(`code: ${statusCode}`);
});
