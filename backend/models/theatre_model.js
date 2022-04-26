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
  const query = "SELECT  name FROM theatres WHERE city = $1;";
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
  const query = "SELECT * FROM shows WHERE theatre_id = $1;";
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
      resolve(results.rows);
    });
  });
};

const theatres_within_range = (body) => {
  const { selected_location } = body;
  const query =
    "SELECT name FROM theatres WHERE ST_Distance(location, $1) < threshold";
  return new Promise(function (resolve, reject) {
    pool.query(query, [selected_location], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const movies_aired = (body) => {
  const { theatre_id } = body;
  const query =
    "SELECT movie_id, name from movie WHERE movie_id in (SELECT movie_id FROM shows WHERE theatre_id = $1)";
  return new Promise(function (resolve, reject) {
    pool.query(query, [theatre], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

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
  theatres_within_range,
  movies_aired,
  registerTheatre,
};
