const fs = require('fs');

const langDesignators = JSON.parse(fs.readFileSync(__dirname + '/iso-639-1.json', 'utf-8'));
const regionDesignators = JSON.parse(fs.readFileSync(__dirname + '/iso-3166-1.json', 'utf-8'));
const scriptDesignators = JSON.parse(fs.readFileSync(__dirname + '/iso-15924.json', 'utf-8'));

const cache = {};

/*
  Returns the English name for the supplied language id.

  Language ID syntax is:
  [language designator] to specify language only (en), or
  [language designator] - [region designator] to specify dialect (en-GB), or
  [language designator] - [script designator] to specify script (zh-Hant)

  [language designator] uses ISO-639 standard
  [region designator] uses ISO 3166-1 standard
  [script designator] uses ISO 15924 standard

*/

exports.languageForCode = (code) => {

  // see if we have this code in our cache already..
  if (cache[code]) {
    return cache[code];
  }

  const parts = code.split('-');
  let langPart = parts[0];

  let regionPart, scriptPart;
  if (parts.length > 1) {
    const designator = parts[1];
    if (designator.length === 2) {
      regionPart = designator;
    } else {
      scriptPart = designator;
    }
  }

  let codeFinder = function(value) {
    return function(entry) {
      return entry.code == value;
    }
  }

  let language;

  const langDesignator = langDesignators.find(codeFinder(langPart));
  if (langDesignator) {
    language = langDesignator.language;
  } else {
    // bail out if no language designator has been found.
    return 'Not Found';
  }

  if (regionPart) {
    const regionDesignator = regionDesignators.find(codeFinder(regionPart));
    if (regionDesignator) {
      language = `${language} ${regionDesignator.country}`;
    }

  }
  if (scriptPart) {
    const scriptDesignator = scriptDesignators.find(codeFinder(scriptPart));
    if (scriptDesignator) {
      language = `${language} ${scriptDesignator.script}`;
    }
  }

  // save this result to our cache
  cache[code] = language;

  return language;
}
