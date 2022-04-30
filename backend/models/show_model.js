const format = require("pg-format");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getTheatreMovieShows = (body) => {
  const { city_id, movie_id } = body;
  const query =
    "SELECT * from shows NATURAL INNER JOIN show_timings where theatre_id in (SELECT theatre_id from theatres where city = $1) AND movie_id = $2 and show_date <= CURRENT_DATE + INTERVAL '2 days' and show_date >= CURRENT_DATE;;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [city_id, movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getUnavailableSeats = (body) => {
  const { show_id } = body;
  const query = `SELECT distinct seat_id FROM booking_seat WHERE booking_id IN 
          (SELECT booking_id FROM bookings WHERE show_id = $1) order by seat_id;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [show_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getShowDetails = (body) => {
  const { show_id } = body;
  const query = `SELECT shows.theatre_id, theatres.name theatre_name, shows.movie_id, movies.name movie_name, show_date, ticket
  from shows, theatres, movies WHERE show_id = $1 and theatres.theatre_id = shows.theatre_id and movies.movie_id = shows.movie_id;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [show_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const bookSeats = async (body) => {
  const { show_id, user_id, book_date, seat_ids, book_type } = body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "INSERT INTO bookings (show_id, user_id, book_date, book_type) VALUES($1, $2, $3, $4) returning *";
    res = await client.query(query1, [show_id, user_id, book_date, book_type]);

    seats = seat_ids.map((seat) => [res.rows[0].booking_id, seat]);
    const query2 = format(
      "INSERT INTO booking_seat(booking_id, seat_id) VALUES %L;",
      seats
    );
    await client.query(query2, []);

    await client.query("COMMIT");
    return res.rows[0].booking_id;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getShowSlots = (body) => {
  const { theatre_id, movie_id, screen_num } = body;
  const query = `SELECT * from shows where show_date BETWEEN current_date AND current_date+interval '7 day' AND theatre_id = $1 AND movie_id = $2 AND screen_num = $3;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [theatre_id, movie_id, screen_num], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const selectShows = (body) => {
  const {
    show_timings_id,
    movie_id,
    theatre_id,
    screen_num,
    ticket,
    show_date,
  } = body;

  const query =
    "INSERT INTO shows (show_timings_id, movie_id, theatre_id, screen_num, ticket, show_date) values($1, $2, $3, $4, $5, $6)";
  return new Promise(function (resolve, reject) {
    pool.query(
      query,
      [show_timings_id, movie_id, theatre_id, screen_num, ticket, show_date],
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
  getTheatreMovieShows,
  getUnavailableSeats,
  bookSeats,
  getShowSlots,
  selectShows,
  getShowDetails,
};
