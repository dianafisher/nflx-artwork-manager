const fs = require('fs');
const JSONStream = require('JSONStream');
const winston = require('winston');
const util = require( "util" );

const languageCodeController = require('./languageCodeController');

// Create a variable to hold the index of movieIds and languageCodes
let index;

// Set the level of the logger to 'debug' during development.
winston.level = 'info';

/*
Creates an index of movieIds and languageCodes from payload.json by
scanning through the document and collecting unique movieIds and
unique languageCodes.
*/
exports.createIndex = () => {
  winston.log('debug', 'creating index..');
  return new Promise((resolve, reject) => {
    let transformStream = JSONStream.parse('*');
    let inputStream = fs.createReadStream(__dirname + '/payload.json');

    index = {
      movieId: new Set(),
      languageCode: new Set(),
      movieIdCollection: {},
      languageCodeCollection: {},
      recordCount: 0
    };

    // Stream the data until we reach the end of the file.
    inputStream.pipe(transformStream)
      .on("data", (data) => {

        updateIndex(data, index);
        index.recordCount += 1;
      })
      .on("end", () => {
        winston.log('debug', 'index creation complete.');
        sortCollections(index);
        winston.log('debug', util.format(index));
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  })
}

function updateIndex(data, index) {

  if (data.movieId) {
    index.movieId.add(data.movieId);

    if (index.movieIdCollection[data.movieId]) {
      let entry = index.movieIdCollection[data.movieId];
      let count = entry.count;
      count++;
      entry.count = count;

    } else {
      index.movieIdCollection[data.movieId] = {
        count: 1,
        name: data.movieName
      };
    }

  }
  if (data.languageCode) {
    index.languageCode.add(data.languageCode);
    const lang = languageCodeController.languageForCode(data.languageCode);

    winston.log('debug', {'lang': lang});

    if (index.languageCodeCollection[data.languageCode]) {
      let entry = index.languageCodeCollection[data.languageCode];
      // console.log('entry', entry);
      let count = entry.count;
      count++;
      entry.count = count;

    } else {
      index.languageCodeCollection[data.languageCode] = {
        count:1,
        language: lang
      };
    }
  }
}

function sortCollections(index) {
  // sort index by movie name..
  const movieIds = Array.from(index['movieId']);
  winston.log('debug', util.format(movieIds));
  // sort the array..
  movieIds.sort(function(a, b) {
    // look up movie name
    let ma = index.movieIdCollection[a].name;
    let mb = index.movieIdCollection[b].name;

    return ma.localeCompare(mb);
  });

  winston.log('debug', util.format(movieIds));
  // Update index to hold the sorted array.
  index['movieId'] = movieIds;

  // sort by language
  const languageCodes = Array.from(index['languageCode']);
  languageCodes.sort(function(a, b) {
    // look up language
    let ma = index.languageCodeCollection[a].language;
    let mb = index.languageCodeCollection[b].language;
    return ma.localeCompare(mb);
  });

  winston.log('debug', util.format(languageCodes));
  index['languageCode'] = languageCodes;

}

exports.getMovies = async (req, res) => {
  winston.log('debug', req.query);

  // start at 0 as the default
  let start = parseInt(req.query.start, 10) || 0;

  // use a default of 20 items as the limit per page
  const limit = parseInt(req.query.limit, 10) || 20;

  // use movieId as the default grouping.
  let groupBy = req.query.groupBy || 'movieId';

  // if the groupBy param is one we do not support, respond with an error
  if (groupBy != 'languageCode' && groupBy != 'movieId') {
    const result = {
      'error': 'Unsupported grouping'
    }
    res.status(400).json(result);
    return;
  }

  const end = start + limit;

  // calculate the number of pages we will have based on the number of records
  const recordCount = index.recordCount;
  const pages = Math.ceil(recordCount / limit);

  try {
    let movies = await getMoviesUtil(groupBy, start, end);

    const result = {
      movies,
      pages,
    }

    res.status(200).json(result);
  } catch (err) {
    winston.error(err);
    res.status(500);
  }
}

const getMoviesUtil = async (groupBy, start, end) => {
  // check for invalid groupBy value
  if (groupBy !== 'movieId' && groupBy !== 'languageCode') {
    return [];
  }
  const array = Array.from(index[groupBy]);
  winston.log('debug', 'getMoviesUtil..');
  winston.log('debug', util.format(array));

  let arrayIndex = 0;
  let groupedMovies = [];
  let current = 0;

  while (arrayIndex < array.length && current < end) {

    let item = array[arrayIndex];

    let itemCount = 0;
    // how many of this item do we have?
    if (groupBy === 'movieId') {
      itemCount = index['movieIdCollection'][item].count;
    } else if (groupBy === 'languageCode') {
      itemCount = index['languageCodeCollection'][item].count;
    }
    winston.log('debug', {"itemCount": itemCount});

    let result = await loadMovies(groupBy, item, start, end, current);

    const movies = result.movies;
    current = result.current;

    // add movies to the groupedMovies array
    if (movies.length > 0) {
      groupedMovies.push(movies);
    }

    // move to the next index
    arrayIndex += 1;

  }
  // winston.log('debug', util.format(groupedMovies));

  return groupedMovies;
}

// export the function.
exports.getMoviesUtil = getMoviesUtil;

function loadMovies(groupBy, item, start, end, current) {

  return new Promise((resolve, reject) => {
    let movies = [];
    let transformStream = JSONStream.parse("*");
    let readStream = fs.createReadStream(__dirname + '/payload.json');

    readStream.pipe(transformStream)
      .on("data", (data) => {

        if (data[groupBy] == item) {
          if (current >= start && current < end) {
            // add the language to the data object
            const lang = languageCodeController.languageForCode(data.languageCode);
            data.language = lang;
            // add the object to movies array.
            movies.push(data);
          }
          current += 1;
        }

        if (current >= end) {
          resolve({movies, current});
          readStream.unpipe(transformStream);
          transformStream.end();
        }

      })
      .on('end', () => {
        resolve({movies, current});
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
