//remove interval additions in getTheatreShows after testing
const Pool = require("pg").Pool;
const format = require("pg-format");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getTheatres = (body) => {
  const { city_id } = body;
  const query = "SELECT theatre_id, name FROM theatres WHERE city = $1;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [city_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getTheatreShows = async (body) => {
  const { theatre_id } = body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const query1 = `SELECT show_id, show_timings.name as show_time, shows.movie_id as movie_id, movies.name as movie_name, show_date, screen_num
    FROM shows, show_timings, movies WHERE movies.movie_id = shows.movie_id and 
     shows.show_timings_id = show_timings.show_timings_id and 
    shows.theatre_id = $1 and show_date + interval '1 year' + interval '3 month' + interval '27 day' <= CURRENT_DATE + INTERVAL '2 days' and show_date + interval '1 year' + interval '3 month' + interval '27 day' >= CURRENT_DATE 
  ORDER BY show_date asc, movie_name, screen_num, show_time;`;
    const res1 = await client.query(query1, [theatre_id]);

    const query2 = `select name, cities.city from theatres, cities where theatre_id = $1 and theatres.city = cities.city_id;`;
    const res2 = await client.query(query2, [theatre_id]);
    await client.query("COMMIT");
    return {
      shows_info: res1.rows,
      city: res2.rows[0].city,
      name: res2.rows[0].name,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getTheatreShows2 = async (body) => {
  const { theatre_id } = body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const query1 = `SELECT show_id, show_timings.name as show_time, shows.movie_id as movie_id, movies.name as movie_name, show_date, screen_num
    FROM shows, show_timings, movies WHERE movies.movie_id = shows.movie_id and 
     shows.show_timings_id = show_timings.show_timings_id and 
    shows.theatre_id = $1 and show_date + interval '1 year' + interval '3 month' + interval '27 day' <= CURRENT_DATE + INTERVAL '2 days' and show_date + interval '1 year' + interval '3 month' + interval '27 day' >= CURRENT_DATE 
  ORDER BY movie_id, screen_num, show_time, show_date asc;`;
    const res1 = await client.query(query1, [theatre_id]);

    await client.query("COMMIT");
    return res1.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const rateTheatre = async (body) => {
  const { user_id, theatre_id, rating } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "SELECT * from user_theatre where theatre_id = $1 and user_id = $2;";
    const res1 = await client.query(query1, [theatre_id, user_id]);

    if (res1.rows.length > 0) {
      const query2 =
        "UPDATE user_theatre set rating = $1 where theatre_id = $2 and user_id = $3;";
      const res2 = await client.query(query2, [rating, theatre_id, user_id]);
    } else {
      const query3 = "INSERT INTO user_theatre VALUES($1, $2, $3);";
      const res3 = await client.query(query3, [user_id, theatre_id, rating]);
    }
    await client.query("COMMIT");
    return "";
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getTheatresInRange = (body) => {
  const { longitude, latitude, threshold } = body;

  const query =
    "SELECT theatre_id, name FROM theatres WHERE ST_Distance(ST_Transform(location::geometry, 26986), ST_Transform('SRID=4326;POINT(" +
    longitude +
    " " +
    latitude +
    ")'::geometry, 26986)) / 1000 < $1;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [threshold], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getTheatreMovies = (body) => {
  const { theatre_id } = body;
  const query =
    "SELECT movie_id, name from movies WHERE movie_id in (SELECT movie_id FROM shows WHERE theatre_id = $1 and show_date > CURRENT_DATE)";
  return new Promise(function (resolve, reject) {
    pool.query(query, [theatre_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const registerTheatre = async (body) => {
  function generatePassword() {
    var length = 10,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const { name, city, latitude, longitude, num_of_screens } = body;

  const pswd = generatePassword();
  const screens = Array.from(
    { length: num_of_screens },
    (_, index) => index + 1
  );
  const username = name + "_" + city;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const query1 = "SELECT * FROM theatres  WHERE name = $1 and  city = $2";
    const res1 = await client.query(query1, [name, city]);

    if (res1.rows.length > 0) {
      await client.query("COMMIT");
      return { username: null, password: null };
    }

    const query2 =
      "INSERT INTO theatres(name, city, password, username, location) values($1, $2, $3, $4, " +
      "ST_GeomFromText('POINT(" +
      longitude +
      " " +
      latitude +
      ")',4326));";
    await client.query(query2, [name, city, pswd, username]);

    const query3 =
      "SELECT theatre_id FROM theatres  WHERE name = $1 and  city = $2";
    const res2 = await client.query(query3, [name, city]);

    const theatre_id = res2.rows[0]["theatre_id"];
    const theatreScreens = screens.map((screen) => [screen, theatre_id]);

    const query4 = format("INSERT INTO screens values %L;", theatreScreens);
    await client.query(query4, []);

    await client.query("COMMIT");
    return { username: username, password: pswd };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const theatreLogin = async (body) => {
  const { login_id, password } = body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query =
      "SELECT theatre_id from theatres WHERE username = $1 AND password = $2";
    const res = await client.query(query, [login_id, password]);

    await client.query("COMMIT");

    if (res.rows.length == 0) return { theatre_id: null };
    else {
      const token = jwt.sign(
        { theatre_id: res.rows[0].theatre_id },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      return {
        user_id: res.rows[0].theatre_id,
        accessToken: token,
      };
    }
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const adminLogin = async (body) => {
  const { login_id, password } = body;

  if (login_id != "administrator" || password != "islskrprprk") return null;
  else {
    const token = jwt.sign(
      { login_id: "administrator" },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    return {
      accessToken: token,
    };
  }
};

module.exports = {
  getTheatres,
  getTheatreShows,
  getTheatreShows2,
  rateTheatre,
  getTheatresInRange,
  getTheatreMovies,
  registerTheatre,
  theatreLogin,
  adminLogin,
};
