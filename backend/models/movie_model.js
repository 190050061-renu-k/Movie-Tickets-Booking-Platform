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

const getMovieInfo = (body) => {
  const { movie_id } = body;
  const query1 = "SELECT * from movies where movie_id = $1;";
  const movieInfo = new Promise(function (resolve, reject) {
    pool.query(query1, [movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const query2 =
    "SELECT distinct name from artist WHERE artist_id in (SELECT artist_id from movie_artists where movie_id = $1;";
  const artists = new Promise(function (resolve, reject) {
    pool.query(query2, [movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([movieInfo, artists]).then(
    function (values) {
      return {
        movie: values[0],
        artists: values[1],
      };
    },
    function (error) {
      throw error;
    }
  );
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

const getfilteredmovies = (body) => {
  const { genre_id, language_id } = body;
  const query1 =
    "SELECT name FROM movies WHERE movie_id IN (SELECT movie_id FROM movie_genres WHERE genre_id = $1)";
  const genremovies = new Promise(function (resolve, reject) {
    pool.query(query1, [genre_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const query2 =
    "SELECT name FROM movies WHERE movie_id IN (SELECT movie_id FROM movie_languages WHERE language_id = $1)";
  const languagemovies = new Promise(function (resolve, reject) {
    pool.query(query2, [language_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([genremovies, languagemovies]).then(
    function (values) {
      return {
        movie_name1: values[0],
        movie_name2: values[1],
      };
    },
    function (error) {
      throw error;
    }
  );
};

module.exports = {
  getMovies,
  getMovieInfo,
  rateMovie,
  getUpcomingMovies,
  setPreference,
  getfilteredmovies,
};
