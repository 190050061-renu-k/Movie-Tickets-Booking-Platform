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

module.exports = {
  getProfile,
};
