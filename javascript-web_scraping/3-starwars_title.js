#!/usr/bin/node
const request = require('request');

// Obtén el ID de la película de los argumentos de la línea de comandos
const movieId = process.argv[2];

// Construye la URL de la solicitud utilizando el ID de la película
const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

// Realiza una solicitud GET a la API de Star Wars
request.get(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  // Analiza el cuerpo de la respuesta JSON
  const data = JSON.parse(body);

  // Obtiene el título de la película
  const title = data.title;

  // Imprime el título de la película
  console.log(title);
});
