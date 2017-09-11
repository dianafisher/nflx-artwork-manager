const express = require('express');
const path = require('path');

const movieController = require('./movieController');

// Create our Express app
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/api/movies', movieController.getMovies);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

(async () => {
  // create the index
  await movieController.createIndex();

  // start the server
  app.listen(9000);
  console.log('app listening on port 9000');
})();
