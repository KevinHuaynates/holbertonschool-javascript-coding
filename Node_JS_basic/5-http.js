const http = require('http');
const fs = require('fs');

const filePath = process.argv[2];

function handleRequest(req, res) {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Holberton School!');
      break;
    case '/students':
      readFileAsync(filePath)
        .then(() => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
        })
        .catch((error) => {
          console.error(error);
          res.writeHead(500);
          res.end('Error reading file');
        });
      break;
    default:
      res.writeHead(404);
      res.end('Not found');
  }
}

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const app = http.createServer(handleRequest);
app.listen(1245);

module.exports = app;
