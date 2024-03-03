// Importing the required module
const http = require('http');

// Creating a HTTP server
const app = http.createServer((req, res) => {
    // Setting the response headers
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Sending the response
    res.end('Hello Holberton School!\n');
});

// Listening on port 1245
app.listen(1245);

// Exporting the app
module.exports = app;
