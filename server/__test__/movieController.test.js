const movieController = require('../movieController');

// Build the index before running tests
beforeAll(async () => {
  await movieController.createIndex();
})

describe('movieController', () => {
  it('returns one result', async () => {
    const movies = await movieController.getMoviesUtil('movieId', 0, 1);
    expect(movies).toHaveLength(1);
  });

  it('returns movies sorted by movie name', async () => {
    const movies = await movieController.getMoviesUtil('movieId', 0, 30);
    expect(movies).toHaveLength(2);  // two groups
    expect(movies[0][0].movieName).toBe('Arrested Development');
    expect(movies[1][0].movieName).toBe('House of Cards');
  });

  it('returns movies sorted by language', async () => {
    const movies = await movieController.getMoviesUtil('languageCode', 0, 6);
    expect(movies).toHaveLength(2);  // two groups
    expect(movies[0][0].language).toBe('Arabic');
    expect(movies[1][0].language).toBe('Bokmål, Norwegian');
  });

  it('returns movies grouped within range', async () => {
    const movies = await movieController.getMoviesUtil('movieId', 40, 70);
    expect(movies).toHaveLength(3);  // three groups
    expect(movies[0][0].movieName).toBe('House of Cards');
    expect(movies[0]).toHaveLength(9);
    expect(movies[1][0].movieName).toBe('Lilyhammer');
    expect(movies[1]).toHaveLength(12);
    expect(movies[2][0].movieName).toBe('Marco Polo');
    expect(movies[2]).toHaveLength(9);
  });

  it('does not crash when provided invalid groupBy value', async () => {
    const movies = await movieController.getMoviesUtil('invalid', 0, 5);
    expect(movies).toHaveLength(0);
  });

  it('does not crash when start is greater then end', async () => {
    const movies = await movieController.getMoviesUtil('movieId', 5, 2);
    expect(movies).toHaveLength(0);
  });

  it('does not crash when start is negative', async () => {
    const movies = await movieController.getMoviesUtil('movieId', -5, 5);
    expect(movies).toHaveLength(1);  // returns 1 group
    expect(movies[0]).toHaveLength(5);  // 5 items in the group
  });

  it('does not crash when end is out of range', async () => {
    const movies = await movieController.getMoviesUtil('movieId', 113, 1000);
    expect(movies).toHaveLength(0);  // returns 0 groups
  });
});
