const http = require('http')

const server = http.createServer((req, res)=> {
  
  const {url, method} = req;
  if(url == '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node Server</title></head>')
    res.write('<body><h1>Welcome to Node Server</h1></body>')
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Dummy users</title></head>');
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  if(url == '/create-user' && method == 'POST'){
    const data = []
    res.on('data', (chunk) => {
      data.push(chunk)
    });
    res.on('end', ()=> {
      const parseBody = Buffer.concat(data).toString();
      console.log(parseBody)
    });
    res.statusCode = '302';
    res.setHeader('Location', '/');
    res.end();

  }
});

server.listen(3000);