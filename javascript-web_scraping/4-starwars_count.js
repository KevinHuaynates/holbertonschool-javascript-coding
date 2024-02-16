#!/usr/bin/node
const request = require('request');

// Obtén la URL de la API de Star Wars de los argumentos de la línea de comandos
const apiUrl = process.argv[2];

// Realiza una solicitud GET a la API de Star Wars
request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  // Analiza el cuerpo de la respuesta JSON
  const data = JSON.parse(body);

  // Inicializa un contador para el número de películas donde aparece Wedge Antilles
  let wedgeMoviesCount = 0;

  // Itera sobre cada película en los datos
  data.results.forEach(movie => {
    // Verifica si Wedge Antilles está presente en los personajes de la película
    const wedgePresent = movie.characters.some(characterUrl => characterUrl.includes('18'));    
    // Si Wedge Antilles está presente, incrementa el contador
    if (wedgePresent) {
      wedgeMoviesCount++;
    }
  });

  // Imprime el número de películas donde aparece Wedge Antilles
  console.log(wedgeMoviesCount);
});
