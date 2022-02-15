import { createServer } from 'http';
import { PORT } from './config.js';
import { renderFile as ejsRender } from 'ejs';

const server = createServer(async (req, res) => {
  const { url } = req;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(await ejsRender('./views/index.ejs', { title:'Title', url }));
});
server.listen(PORT);
