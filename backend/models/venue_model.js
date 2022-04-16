const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getVenues = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT venue_name, venue_id FROM venue", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getVenueInfo = (body) => {
  const { venue_id } = body;
  const basicInfo = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT venue_name, city_name, country_name, capacity, count( case when venue.venue_id = match.venue_id then 1 end ) matches_played \
    FROM venue, match WHERE venue.venue_id = $1 \
    GROUP BY venue.venue_id;";
    pool.query(query_1, [venue_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const extremeScores = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT  COALESCE(MAX(total_runs), 0) highest_scored, COALESCE(Min(total_runs), 0) least_scored FROM \
    match, (SELECT match_id, sum(runs_scored + extra_runs) total_runs FROM ball_by_ball GROUP By match_id, innings_no) runs_tab \
    WHERE venue_id = $1 and  match.match_id = runs_tab.match_id;";
    pool.query(query_1, [venue_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const highestChased = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT  COALESCE(MAX(total_runs), 0) highest_chased FROM match, \
    (SELECT match_id, sum(runs_scored + extra_runs) total_runs FROM ball_by_ball WHERE innings_no = 1 \
    GROUP By match_id) runs_tab \
    WHERE venue_id = $1 and match.match_id = runs_tab.match_id and win_type = 'wickets';";
    pool.query(query_1, [venue_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const differentWins = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT count(case when win_type='runs' THEN 1 end) batting_first, \
    count(case when win_type='wickets'  THEN 1 end) batting_sec, \
    count(case when win_type is NUll Then 1 end) drawn FROM match WHERE venue_id = $1;";
    pool.query(query_1, [venue_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const averageScore = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT season_year, ROUND(AVG(total_runs), 2) FROM match, \
    (SElECT match_id, sum(runs_scored + extra_runs) total_runs FROM ball_by_ball WHERE innings_no = 1 Group by match_id) runs \
    WHERE venue_id = $1 and season_year in (2011, 2013, 2015, 2017) and runs.match_id = match.match_id \
    GROUP BY season_year;";
    pool.query(query_1, [venue_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([
    basicInfo,
    extremeScores,
    highestChased,
    differentWins,
    averageScore,
  ]).then(
    function (values) {
      return {
        basicInfo: values[0],
        extremeScores: values[1],
        highestChased: values[2],
        differentWins: values[3],
        averageScore: values[4],
      };
    },
    function (error) {
      throw error;
    }
  );
};

const addVenue = (body) => {
  const { venueName, countryName, cityName, capacity } = body;
  return new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO venue (venue_name, city_name, country_name, capacity) VALUES ($1, $2, $3, $4) RETURNING *",
      [venueName, countryName, cityName, capacity],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

module.exports = {
  getVenues,
  getVenueInfo,
  addVenue,
};
