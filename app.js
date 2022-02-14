const { createServer } = require('http');
const { PORT } = require('./config');
const { renderFile: ejsRender } = require('ejs');

const server = createServer(async (req, res) => {
  const { url } = req;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(await ejsRender('./views/index.ejs', { title:'Title', url }));
});
server.listen(PORT);
