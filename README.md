# Netflix Artwork Manager (nflx-artwork)
Netflix Artwork Manager is an app to allow users to quickly manage artwork across titles.

* Group movies by movie id or language code.
* Movies are listed in alphabetical order by movie name when grouped by movie id and by language when grouped by language code.
* Language codes are converted to their English language display form via ISO table lookup.
* Artwork is returned in pages of 21 items per page.
* A zoomed-in view is available for each artwork thumbnail by clicking on the thumbnail.  A modal view will appear with the large version of the image along with the movie details.

* On server start-up, an index is created from the payload.json file to allow response data to be sorted by movie name or language.  The data file is streamed to minimize server memory.

## Installation

* node verion v7.10.0 or above is required

npm install or yarn install

npm run build or yarn build

## Running

npm start or yarn start

Open a browser and navigate to http://localhost:9000/ for the web app.

Navigate to http://localhost:9000/api/movies for the API endpoint.

The endpoint takes the following query parameters:

groupBy (movieId or languageCode)
start (the index of the first item to return)
limit (number of items to return)

Example:

http://localhost:9000/api/movies?groupBy=movieId&start=10&limit=20

## Testing

npm test or yarn test to test the UI.

npm run test-server or yarn server-test to test the server
