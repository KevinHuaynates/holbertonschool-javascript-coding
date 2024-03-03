const { stdin, stdout } = require('process');
stdout.write('Welcome to Holberton School, what is your name?\n');
stdin.on('data', data => stdout.write(`Your name is: ${data}`));
stdin.on('end', () => stdout.write('This important software is now closing\n'));
