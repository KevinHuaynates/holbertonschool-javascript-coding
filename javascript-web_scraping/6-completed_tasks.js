#!/usr/bin/node

const request = require('request');

// Obtén la URL de la API de los argumentos de la línea de comandos
const apiUrl = process.argv[2];

// Realiza una solicitud GET a la API
request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  // Analiza el cuerpo de la respuesta JSON
  const todos = JSON.parse(body);

  // Inicializa un objeto para almacenar el recuento de tareas completadas por usuario
  const completedTasksByUser = {};

  // Itera sobre cada tarea
  todos.forEach(todo => {
    // Verifica si la tarea está completada
    if (todo.completed) {
      // Incrementa el recuento de tareas completadas para el usuario correspondiente
      if (completedTasksByUser[todo.userId]) {
        completedTasksByUser[todo.userId]++;
      } else {
        completedTasksByUser[todo.userId] = 1;
      }
    }
  });

  // Imprime el recuento de tareas completadas por usuario
  console.log(completedTasksByUser);
});
