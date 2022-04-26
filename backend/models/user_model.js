const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getProfile = async (body) => {
  const { user_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT name, user_bookings.booking_id, book_date, book_type, label, column_ FROM movies, shows, booking_seat, seats, (SELECT * FROM bookings WHERE user_id = $1) user_bookings WHERE user_bookings.booking_id = booking_seat.booking_id AND user_bookings.show_id  = shows.show_id AND shows.movie_id = movies.movie_id AND booking_seat.seat_id  = seats.seat_id";
    const res1 = await client.query(query1, [user_id]);

    const query2 =
      "SELECT name from genres where genre_id in (SELECT genre_id from user_genres where user_id = $1);";
    const res2 = await client.query(query2, [user_id]);

    const query3 =
      "SELECT name from languages where language_id in (SELECT language_id from user_languages where user_id = $1);";
    const res3 = await client.query(query3, [user_id]);

    await client.query("COMMIT");
    return { demographic: res1.rows, genres: res2.rows, languages: res3.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
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

const signUp = async (body) => {
  const { username, age, mobile_num, pswd, city_id, language_id, genre_id } =
    body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 = "SELECT COUNT(*) FROM users WHERE mobileNumber= $1";
    const res1 = await client.query(query1, [mobile_num]);
    if (res1.rows[0][0] > 0) {
      await client.query("COMMIT");
      return res1.rows;
    }

    const query2 =
      "INSERT INTO users (userName, age, mobileNumber, password, city_id) VALUES($1, $2, $3, $4, $5) RETURNING user_id;";
    const res2 = await client.query(query2, [
      username,
      age,
      mobile_num,
      pswd,
      city_id,
    ]);

    user_id = res2[0][0];

    const query3 =
      "INSERT INTO user_languages (user_id, language_id) VALUES($1, 2);";
    await client.query(query3, [user_id, language_id]);

    const query4 =
      "INSERT INTO user_genres (user_id, genre_id) VALUES($1, $2);";
    await client.query(query4, [user_id, genre_id]);

    await client.query("COMMIT");
    return { mobile_cnt: res1.rows, user_id: res2.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const editProfile = async (body) => {
  const { username, age, user_id, city_id, language_id, genre_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 = "UPDATE users SET city_id = $1 WHERE user_id = $2";
    await client.query(query1, [city_id, user_id]);

    const query2 = "UPDATE users SET age = $1  WHERE user_id = $2;";
    const res2 = await client.query(query2, [age, user_id]);

    const query3 = "UPDATE users SET userName = $1  WHERE user_id = $2;";
    await client.query(query3, [username, user_id]);

    const query4 =
      "UPDATE user_languages SET language_id =$1  WHERE user_id = $2;";
    await client.query(query4, [language_id, user_id]);

    const query5 = "UPDATE user_genres SET genre_id = $1  WHERE user_id = $2;";
    await client.query(query4, [genre_id, user_id]);

    await client.query("COMMIT");
    return "";
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  getProfile,
  getRecommendations,
  bookinghistory,
  userlogin,
  passwordchange,
  signUp,
  editProfile,
};
