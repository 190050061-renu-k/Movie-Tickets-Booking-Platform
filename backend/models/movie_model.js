const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getMovies = (body) => {
  const { city_id } = body;
  const query =
    "SELECT name from movies where movie_id in (SELECT distinct movie_id from shows where theatre_id in (SELECT theatre_id from theatres where city = $1));";
  return new Promise(function (resolve, reject) {
    pool.query(query, [city_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
module.exports = {
  getMovies,
};
