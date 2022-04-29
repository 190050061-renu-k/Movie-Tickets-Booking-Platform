//remove interval additions in getMovieTheatres after testing

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
  const query = `SELECT name, movie_id, poster_img from movies where movie_id in 
        (SELECT distinct movie_id from shows where theatre_id in 
          (SELECT theatre_id from theatres where city = $1) and show_date BETWEEN current_date AND current_date+interval '3 day') 
          ORDER BY imdb_rating desc LIMIT 15;`;
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
      "SELECT distinct artist_id, name from artists WHERE artist_id in (SELECT artist_id from movie_artists where movie_id = $1)";
    const res2 = await client.query(query2, [movie_id]);

    const query3 =
      "SELECT name from genres WHERE genre_id in (SELECT genre_id from movie_genres where movie_id = $1)";
    const res3 = await client.query(query3, [movie_id]);

    const query4 =
      "SELECT name from languages WHERE language_id in (SELECT language_id from movie_languages where movie_id = $1)";
    const res4 = await client.query(query4, [movie_id]);

    await client.query("COMMIT");
    return {
      info: res1.rows,
      artists: res2.rows,
      genres: res3.rows,
      languages: res4.rows,
    };
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
      resolve(true);
    });
  });
};

const getUpcomingMovies = (body) => {
  const query =
    "SELECT name, movie_id, poster_img from movies where upcoming = TRUE LIMIT 15;";
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
  const query = "INSERT INTO user_movie VALUES($1,$2, 'TRUE', NULL);";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id, movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};

const addMovie = (body) => {
  const { name, release_date, poster_img, description, homepage } = body;
  const query =
    "INSERT INTO movies (name, release_date, count_theatres, upcoming, poster_img, imdb_rating, description, homepage) VALUES($1, $2, 0, true, $3, NULL, $4, $5);";
  return new Promise(function (resolve, reject) {
    pool.query(
      query,
      [name, release_date, poster_img, description, homepage],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      }
    );
  });
};

const getGenreMovies = async (body) => {
  const { genre_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT * FROM movies WHERE movie_id IN \
      (SELECT movie_id FROM movie_genres WHERE genre_id = $1) and  movie_id IN\
      (SELECT distinct movie_id from shows where \
      show_date BETWEEN current_date AND current_date+interval '3 day')";

    const res1 = await client.query(query1, [genre_id]);

    await client.query("COMMIT");
    return res1.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getLanguageMovies = async (body) => {
  const { language_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const query2 =
      "SELECT name FROM movies WHERE movie_id IN \
      (SELECT movie_id FROM movie_languages WHERE language_id = $1) and  movie_id IN\
      (SELECT distinct movie_id from shows where \
      show_date BETWEEN current_date AND current_date+interval '3 day');";
    const res2 = await client.query(query2, [language_id]);

    await client.query("COMMIT");
    return res2.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getMovieTheatres = async (body) => {
  const { movie_id, city_id } = body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const query1 = `SELECT show_id, show_timings.name as show_time, theatres.name as theatre_name, shows.theatre_id as theatre_id, show_date, screen_num
    FROM shows, show_timings, theatres where 
    city = $1 and theatres.theatre_id = shows.theatre_id and shows.show_timings_id = show_timings.show_timings_id and 
    shows.movie_id = $2 and show_date <= CURRENT_DATE + INTERVAL '2 days' and show_date >= CURRENT_DATE 
  ORDER BY show_date asc, theatres.name, screen_num, show_timings.show_timings_id;`;
    const res1 = await client.query(query1, [city_id, movie_id]);

    const query2 = `select name from movies where movie_id = $1`;
    const res2 = await client.query(query2, [movie_id]);
    await client.query("COMMIT");
    return { shows_info: res1.rows, name: res2.rows };
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
  getGenreMovies,
  getLanguageMovies,
  addMovie,
  getMovieTheatres,
};
