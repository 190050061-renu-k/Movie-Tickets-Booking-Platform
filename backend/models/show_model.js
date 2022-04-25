const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getTheatreMovieShows = (body) => {
  const { city_id, movie_id } = body;
  const query =
    "SELECT * from shows where theatre_id in (SELECT theatre_id from theatre where city_id = $1) AND movie_id = $2;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [city_id, movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getAvailableSeats = (body) => {
  const { movie_id, theatre_id, screen_num, show_date, show_timing } = body;
  const query =
    "SELECT seat_id FROM booking_seat WHERE booking_id IN \
      (SELECT booking_id FROM bookings WHERE show_id IN \
      (SELECT show_id FROM shows WHERE movie_id = $1 AND theatre_id = $2 AND screen_num = $3 AND show_date = $4 AND show_timings_id = $5));";
  return new Promise(function (resolve, reject) {
    pool.query(
      query,
      [movie_id, theatre_id, screen_num, show_date, show_timing],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getTheatreShows,
  getAvailableSeats,
};
