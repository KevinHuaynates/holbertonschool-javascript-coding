// 1-stdin.js

// Mostrar el mensaje de bienvenida
process.stdout.write("Welcome to Holberton School, what is your name?\n");

// Configurar la entrada estándar (stdin) para leer desde la consola
process.stdin.setEncoding('utf8');

// Leer la entrada del usuario desde la consola
process.stdin.on('data', function(data) {
    // Eliminar el salto de línea del final del input
    const name = data.trim();

    // Mostrar el nombre ingresado por el usuario con un salto de línea
    process.stdout.write(`Your name is: ${name}\n`);
});

// Manejar el evento 'end' cuando el usuario termina el programa
process.stdin.on('end', function() {
    // Mostrar el mensaje de cierre con un salto de línea
    process.stdout.write("This important software is now closing\n");
});
