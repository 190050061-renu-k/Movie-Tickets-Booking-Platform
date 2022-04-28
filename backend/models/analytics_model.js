const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getMovieRatings = () => {
  const query =
    "SELECT movies.movie_id, movies.name, AVG(rating) \
    FROM user_movie, movies \
    GROUP BY movies.movie_id, movies.name;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getTheatreRatings = () => {
  const query =
    "SELECT theatres.theatre_id, theatres.name, AVG(rating) \
      FROM user_theatre, theatres \
      GROUP BY theatres.theatre_id, theatres.name;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getGenreChoice = () => {
  const query =
    "SELECT genres.genre_id, genres.name, SUM(seats_for_show.seats_booked) \
      FROM movies, movie_genres, shows, genres, \
      (SELECT show_id, SUM(seats_booked) seats_booked_ FROM all_bookings GROUP BY show_id) seats_for_show \
      WHERE movies.movie_id = movie_genres.movie_id AND shows.movie_id = movies.movie_id AND shows.show_id = seats_for_show.show_id AND genres.genre_id = movie_genres.genre_id \
      GROUP BY genres.genre_id, genres.name;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getLanguageChoice = () => {
  const query =
    "SELECT languages.language_id, languages.name, SUM(seats_for_show.seats_booked) \
    FROM movies, movie_languages, shows, languages, \
    (SELECT show_id, SUM(seats_booked) seats_booked_ FROM all_bookings GROUP BY show_id) seats_for_show \
    WHERE movies.movie_id = movie_languages.movie_id AND shows.movie_id = movies.movie_id AND shows.show_id = seats_for_show.show_id AND languages.language_id = movie_languages.language_id \
    GROUP BY languages.language_id, languages.name;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getAudiencePercent = (body) => {
  const { movie_id } = body;
  const query =
    "SELECT seats_for_show.theatre_id, theatres.name,  SUM(seats_for_show.seats_booked) audience  FROM theatres, shows, \
      (SELECT show_id, SUM(seats_booked) seats_booked_ FROM all_bookings GROUP BY show_id) seats_for_show \
      WHERE theatres.theatre_id = seats_for_show.theatre_id AND shows.movie_id = $1 AND shows.show_id = seats_for_show.show_id \
      GROUP BY seats_for_show.theatre_id, theatres.name;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getOnlineVsOffline = async (body) => {
  const { theatre_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT count(seat_id) from booking_seat where booking_id in (SELECT booking_id FROM bookings WHERE book_type ='online' and show_id in (SELECT show_id from shows WHERE theatre_id = $1));";
    const res1 = await client.query(query1, [theatre_id]);

    const query2 =
      "SELECT count(seat_id) from booking_seat where booking_id in (SELECT booking_id FROM bookings WHERE book_type = 'offline' and show_id in (SELECT show_id from shows WHERE theatre_id = $1));";
    const res2 = await client.query(query2, [theatre_id]);

    await client.query("COMMIT");
    return { online: res1.rows, offline: res2.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getAdminAnalytics = () => {
  const query1 = `SELECT theatre_id, theatres.name, show_online_offline.book_type, SUM(show_online_offline.seats_booked) sum_seats FROM theatres, shows,
  (SELECT book_type, show_id, SUM(seats_booked) seats_booked_ FROM all_bookings GROUP BY book_type, show_id) show_online_offline
  WHERE theatres.theatre_id = shows.theatre_id AND shows.show_id = show_online_offline.show_id
  GROUP BY theatre_id, theatres.name, show_online_offline.book_type;`;
  return new Promise(function (resolve, reject) {
    pool.query(query1, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = {
  getMovieRatings,
  getTheatreRatings,
  getGenreChoice,
  getLanguageChoice,
  getAudiencePercent,
  getAdminAnalytics,
  getOnlineVsOffline,
};
