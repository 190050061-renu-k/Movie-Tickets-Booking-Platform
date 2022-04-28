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

const getAvailableSeats = (body) => {
  const { show_id } = body;
  const query = `SELECT * from seats where seat_id not in 
	(SELECT seat_id FROM booking_seat WHERE booking_id IN 
          (SELECT booking_id FROM bookings WHERE show_id = $1));`;
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
  const { show_id, user_id, book_date, seat_id, book_type } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "INSERT INTO bookings (show_id, user_id, book_date, book_type) VALUES($1, $2, $3, $4)";
    await client.query(query1, [show_id, user_id, book_date, book_type]);

    const query2 = "INSERT INTO booking_seat VALUES($1) ;";
    await client.query(query2, [seat_id]);

    await client.query("COMMIT");
    return "";
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
  getAvailableSeats,
  bookSeats,
  getShowSlots,
  selectShows,
};
