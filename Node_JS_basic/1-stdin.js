#!/usr/bin/env node

process.stdin.resume();

process.stdout.write('Welcome to Holberton School, what is your name?\r');

process.stdin.on('data', (input) => {
  process.stdout.write(`Your name is: ${input.toString().trim()}\r`);
  process.exit(0);
});

process.on('close', () => {
  console.log('This important software is now closing');
});
