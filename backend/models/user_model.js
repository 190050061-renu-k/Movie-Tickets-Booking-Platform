const Pool = require("pg").Pool;
const format = require("pg-format");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getProfile = async () => {
  const { user_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT userName, age, mobileNumber, city from users, cities where user_id = $1 and cities.city_id = users.city_id;";
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
    "SELECT movie_id, name from movies where movie_id in  \
    (SELECT movie_id from movie_genres NATURAL FULL OUTER JOIN movie_languages where genre_id in \
      (SELECT genre_id from user_genres where user_id = $1) and language_id in  \
      (SELECT language_id from user_languages where user_id = $2))ORDER BY imdb_rating DESC LIMIT 10;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id, user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getBookingHistory = () => {
  const { user_id } = body;
  const query =
    "SELECT movies.name, theatres.name, user_bookings.booking_id, book_date, book_type, label, column_ FROM \
    movies, theatres, shows, booking_seat, seats, (SELECT * FROM bookings WHERE user_id = $1) user_bookings WHERE \
    user_bookings.booking_id = booking_seat.booking_id AND user_bookings.show_id  = shows.show_id \
    AND shows.movie_id = movies.movie_id AND booking_seat.seat_id  = seats.seat_id AND shows.theatre_id = theatres.theatre_id;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const userLogin = () => {
  const { mobile_number, password } = body;
  const query =
    "SELECT user_id, count(*) from users WHERE mobileNumber = $1 AND password = $2 group by user_id";
  return new Promise(function (resolve, reject) {
    pool.query(query, [mobile_number, password], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const changePassword = async (body) => {
  const { old_password, new_password, user_id } = body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT COUNT(*) FROM users WHERE user_id= $1 and password=$2";
    const res1 = await client.query(query1, [user_id, old_password]);

    if (res1.rows[0]["count"] == 0) {
      await client.query("COMMIT");
      return false;
    }

    const query2 = "UPDATE users SET password = $1 WHERE user_id = $2;";
    await client.query(query2, [new_password, user_id]);

    await client.query("COMMIT");
    return true;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const signUp = async () => {
  const { userName, age, mobile_num, pswd, city_id, language_ids, genre_ids } =
    body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 = "SELECT COUNT(*) FROM users WHERE mobileNumber= $1";
    const res1 = await client.query(query1, [mobile_num]);
    if (res1.rows[0]["count"] > 0) {
      await client.query("COMMIT");
      return { mobile_cnt: res1.rows, user_id: null };
    }

    const query2 =
      "INSERT INTO users (username, age, mobilenumber, password, city_id) VALUES($1, $2, $3, $4, $5);";
    await client.query(query2, [userName, age, mobile_num, pswd, city_id]);

    const query = "SELECT user_id FROM users WHERE mobileNumber= $1";
    const res2 = await client.query(query, [mobile_num]);

    if (res2.rows.length == 0) {
      await client.query("COMMIT");
      return { mobile_cnt: res1.rows, user_id: null };
    }

    const user_id = res2.rows[0]["user_id"];

    const languages = language_ids.map((language_id) => [user_id, language_id]);
    const query3 = format(
      "INSERT INTO user_languages (user_id, language_id) VALUES %L;",
      languages
    );
    await client.query(query3, []);

    const genres = genre_ids.map((genre_id) => [user_id, genre_id]);
    const query4 = format(
      "INSERT INTO user_genres (user_id, genre_id) VALUES %L;",
      genres
    );
    await client.query(query4, []);

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
  const { username, age, user_id, city_id, language_ids, genre_ids } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 = "UPDATE users SET city_id = $1 WHERE user_id = $2";
    await client.query(query1, [city_id, user_id]);

    const query2 = "UPDATE users SET age = $1  WHERE user_id = $2;";
    await client.query(query2, [age, user_id]);

    const query3 = "UPDATE users SET userName = $1  WHERE user_id = $2;";
    await client.query(query3, [username, user_id]);

    const query4 = "DELETE from user_languages WHERE user_id = $1;";
    await client.query(query4, [user_id]);

    const languages = language_ids.map((language_id) => [user_id, language_id]);
    const query5 = format(
      "INSERT INTO user_languages (user_id, language_id) VALUES %L;",
      languages
    );
    await client.query(query5, []);

    const query6 = "DELETE from user_genres WHERE user_id = $1;";
    await client.query(query6, [user_id]);

    const genres = genre_ids.map((genre_id) => [user_id, genre_id]);
    const query7 = format(
      "INSERT INTO user_genres (user_id, genre_id) VALUES %L;",
      genres
    );
    await client.query(query7, []);

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
  getBookingHistory,
  userLogin,
  changePassword,
  signUp,
  editProfile,
};