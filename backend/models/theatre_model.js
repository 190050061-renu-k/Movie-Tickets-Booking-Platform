const Pool = require("pg").Pool;
const format = require("pg-format");

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

const getTheatreShows = async (body) => {
  const { theatre_id } = body;
  const client = await pool.connect();
  try{
    await client.query("BEGIN");
    const query1 =
    `SELECT show_timings.name as show_time, shows.movie_id as movie_id, show_date, movies.name as movie_name, show_timings.show_timings_id as sid
    FROM shows, show_timings, theatres, movies WHERE movies.movie_id = shows.movie_id and 
    theatres.theatre_id = shows.theatre_id and shows.show_timings_id = show_timings.show_timings_id
    and shows.theatre_id = 8 and show_date <= CURRENT_DATE + INTERVAL '2 days' and
    show_date >= CURRENT_DATE ORDER BY show_date, movie_name, sid;`;
    const res1 = await client.query(query1, [theatre_id]);
    const query2 = `select city from cities where city_id in (select city from theatres where theatre_id = $1)`;
    const res2 = await client.query(query2, [theatre_id]);
    const query3 = `select name from theatres where theatre_id = $1`;
    const res3 = await client.query(query3, [theatre_id]);
    await client.query("COMMIT");
    return {
      shows_info: res1.rows,
      city: res2.rows,
      theatre_name: res3.rows,
    };
  } catch(e){
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
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

module.exports = {
  getTheatres,
  getTheatreShows,
  rateTheatre,
  getTheatresInRange,
  getTheatreMovies,
  registerTheatre,
};
