const { createServer } = require('http');
const { PORT } = require('./config')
let server = createServer( (req, res) => {
    let { url } = req;
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(`Hello, welcome to bbms site, you are here at ${url}`);
});
server.listen(PORT);
