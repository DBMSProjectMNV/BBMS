import express from 'express';
import { PORT } from './config.js';

const app = express();

app.set('view engine', 'ejs');

/* not needed, it is default configuration */
// app.set('views', path.join(__dirname, 'views'));

app.all('/', (req, res) => {
  res.render('index');
});

// url not found
app.use((req, res) => {
  res.status(404);

  res.format({
    html () {
      res.render('404', { url: `${req.headers.host}${req.url}` });
    },
    json () {
      res.json({ error: 'Not found', errorCode: 404 });
    },
    default () {
      res.type('txt').send('Error (404): File not found');
    }
  });
});

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.code);
  res.render('err', {
    code: err.code,
    desc: err.desc,
    url: `${req.headers.host}${req.url}`
  });
  console.log(err.message);
  next();
});

/*
error object
{
  code: `error code`,
  desc: `error desc`,
  content: `error msg for logging to console`
}
*/

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
