const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getArtistInfo = async (body) => {
  const { artist_id } = body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query1 = "SELECT name from artists where artist_id = $1;";
    const res1 = await client.query(query1, [artist_id]);

    const query2 =
      "SELECT name, movie_id, poster_img from movies where movie_id in (SELECT movie_id FROM movie_artists WHERE artist_id = $1);";
    const res2 = await client.query(query2, [artist_id]);

    await client.query("COMMIT");
    return { name: res1.rows, movies: res2.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const addArtist = (body) => {
  const { artist_name } = body;
  const query1 = "INSERT INTO artists (name) VALUES($1);";
  return new Promise(function (resolve, reject) {
    pool.query(query1, [artist_name], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = {
  getArtistInfo,
  addArtist,
};
