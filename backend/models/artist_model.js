const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getArtistInfo = (body) => {
  const { artist_id } = body;
  const query1 = "SELECT * FROM movie_artists WHERE artist_id = $1;";
  return new Promise(function (resolve, reject) {
    pool.query(query1, [artist_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = {
  getArtistInfo,
};
