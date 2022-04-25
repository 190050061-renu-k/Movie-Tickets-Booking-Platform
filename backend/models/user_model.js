const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getProfile = (body) => {
  const { user_id } = body;

  const demographic = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT userName, age, mobileNumber, city from users, cities where user_id = $1 and cities.city_id = users.city_id;";
    pool.query(query_1, [user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const genres = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT name from genres where genre_id in (SELECT genre_id from user_genre where user_id = $1);";
    pool.query(query_1, [user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const languages = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT name from languages where language_id in (SELECT language _id from user_language where user_id = $1)";
    pool.query(query_1, [user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([demographic, genres, languages]).then(
    function (values) {
      return {
        demographic: values[0],
        genres: values[1],
        languages: values[2],
      };
    },
    function (error) {
      throw error;
    }
  );
};

const getRecommendations = (body) => {
  const { user_id } = body;
  const query =
    "SELECT name from movies where movie_id in \
    (SELECT movie_id from movie_genres NATURAL FULL OUTER JOIN movie_languages where genre_id in \
      (SELECT genre_id from user_genres where user_id = $1) and language_id in \
      (SELECT lanuguage_id from user_languages where user_id = $2)) SORT BY imdb_rating DESC LIMIT 5";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id, user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const bookinghistory = (body) => {
  const { user_id } = body;
  const query =
    "SELECT name, booking_id, book_date, book_type, label, column_ FROM movies, shows, booking_seat, seats, (SELECT * FROM bookings WHERE user_id = $1) user_bookings WHERE user_bookings.booking_id = booking_seat.booking_id AND user_bookings.show_id  = shows.show_id AND shows.movie_id = movies.movie_id AND booking_seat.seat_id  = seats.seat_id";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const userlogin = (body) => {
  const { mobile_number, password } = body;
  const query =
    "SELECT count(*) from users WHERE mobileNumber = $1 AND password = $2";
  return new Promise(function (resolve, reject) {
    pool.query(query, [mobile_number, password], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const passwordchange = (body) => {
  const { password_entry, user_id } = body;
  const query = "UPDATE users SET password = $1 WHERE user_id = $2";
  return new Promise(function (resolve, reject) {
    pool.query(query, [password_entry, user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = {
  getProfile,
  getRecommendations,
  bookinghistory,
  userlogin,
  passwordchange,
};
