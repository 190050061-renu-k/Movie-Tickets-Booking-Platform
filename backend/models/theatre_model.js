const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
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

const getTheatreShows = (body) => {
  const { theatre_id } = body;
  const query =
    "SELECT * FROM shows, show_timings WHERE shows.show_timings_id = show_timings.show_timings_id and theatre_id = $1 and show_date <= CURRENT_DATE + INTERVAL '2 days' and show_date >= CURRENT_DATE AND start_time > CURRENT_TIME;";
  return new Promise(function (resolve, reject) {
    pool.query(query, [theatre_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const rateTheatre = (body) => {
  const { user_id, theatre_id, rating } = body;
  const query = "INSERT INTO user_theatre VALUES($1, $2, $3);";
  return new Promise(function (resolve, reject) {
    pool.query(query, [user_id, theatre_id, rating], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
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

//TODO
const registerTheatre = async (body) => {
  const { name, city, location, screen_num, theatre_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 =
      "INSERT INTO theatres(name, city, location) values($1, $2, $3)";
    await client.query(query1, [name, city, location]);

    const query2 = "INSERT INTO screens values ($1, $2);";
    await client.query(query2, [screen_num, theatre_id]);

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
  getTheatres,
  getTheatreShows,
  rateTheatre,
  getTheatresInRange,
  getTheatreMovies,
  registerTheatre,
};
