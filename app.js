const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('request', req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>My First Page</title></head><body>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form>');
    res.write('</body></html>')
    return res.end();
  };
  
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'Dummy');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>My First Page</title></head><body>');
    res.write('<h1>Path not found</h1>');
    res.write('</body></html>')
});

server.listen(3000);