// 1-stdin.js

process.stdin.setEncoding('utf8');

console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('data', (data) => {
  const name = data.trim(); // Elimina espacios en blanco alrededor del nombre
  console.log(`Your name is: ${name}\r\n`); // Añade \r\n al final del mensaje
  console.log('This important software is now closing');
  process.exit(); // Termina el programa
});
