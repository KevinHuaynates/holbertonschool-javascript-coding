// 1-stdin.js

process.stdin.setEncoding('utf8');

process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  const name = data.trim(); // Elimina espacios en blanco alrededor del nombre
  process.stdout.write(`Your name is: ${name}\r\n`); // Añade \r\n al final del mensaje
  process.stdout.write('This important software is now closing\r\n');
  process.exit(); // Termina el programa
});

