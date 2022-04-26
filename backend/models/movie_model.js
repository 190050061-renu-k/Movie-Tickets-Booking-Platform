const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getMovies = (body) => {
  const { city_id } = body;
  const query =
    "SELECT name from movies where movie_id in (SELECT distinct movie_id from shows where theatre_id in (SELECT theatre_id from theatres where city = $1));";
  return new Promise(function (resolve, reject) {
    pool.query(query, [city_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getMovieInfo = async (body) => {
  const { movie_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 = "SELECT * from movies where movie_id = $1;";
    const res1 = await client.query(query1, [movie_id]);

    const query2 =
      "SELECT distinct name from artist WHERE artist_id in (SELECT artist_id from movie_artists where movie_id = $1;";
    const res2 = await client.query(query2, [movie_id]);

    await client.query("COMMIT");
    return { info: res1.rows, artists: res2.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const rateMovie = (body) => {
  const { user_id, movie_id, rating } = body;
  const query = "INSERT INTO user_movie VALUES($1, $2, NULL, $3);";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id, movie_id, rating], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getUpcomingMovies = (body) => {
  const query = "SELECT name from movies where upcoming = TRUE;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const setPreference = (body) => {
  const { user_id, movie_id } = body;
  const query = "INSERT INTO user_movie VALUES($1,$2, 1, NULL);";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id, movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const addMovie = (body) => {
  const { name, release_date, poster_img, description, homepage } = body;
  const query =
    "INSERT INTO movies (name, release_date, count_theatres, upcoming, poster_img, imdb_rating, description, homepage) VALUES($1, $2, 0, 1, $3, NULL, $4, $5);";
  return new Promise(function (resolve, reject) {
    pool.query(
      query,
      [name, release_date, poster_img, description, homepage],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getFilteredMovies = async (body) => {
  const { genre_id, language_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT name FROM movies WHERE movie_id IN (SELECT movie_id FROM movie_genres WHERE genre_id = $1);";
    const res1 = await client.query(query1, [genre_id]);

    const query2 =
      "SELECT name FROM movies WHERE movie_id IN (SELECT movie_id FROM movie_languages WHERE language_id = $1);";
    const res2 = await client.query(query2, [language_id]);

    await client.query("COMMIT");
    return { online: res1.rows, offline: res2.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  getMovies,
  getMovieInfo,
  rateMovie,
  getUpcomingMovies,
  setPreference,
  getFilteredMovies,
  addMovie,
};
