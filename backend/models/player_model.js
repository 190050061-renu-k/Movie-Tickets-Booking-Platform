const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

//list of all players
const getPlayers = (body) => {
  const { skips, limit } = body;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT player_id, player_name, country_name FROM player OFFSET $1 LIMIT $2;",
      [skips, limit],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getPlayerInfo = (body) => {
  const { player_id } = body;
  const playerInfo = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT player_id, player_name, country_name, batting_hand, bowling_skill FROM player WHERE player_id = $1";

    pool.query(query_1, [player_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const battingInfo = new Promise(function (resolve, reject) {
    query_2 =
      "SELECT t2.player_id, matches_batted, runs, fours, sixes, fifties, hs, strike_rate, average FROM \
       (SELECT striker player_id, sum(runs_scored) runs, count(CASE WHEN runs_scored = 4 THEN 1 END) fours, \
       count(CASE WHEN runs_scored = 6 THEN 1 END) sixes, \
       ROUND((sum(runs_scored) * 1.0/ count(*)) * 100, 2) strike_rate, \
       ROUND(sum(runs_scored) *1.0/ greatest(count(out_type), 1), 2) average \
       FROM ball_by_ball WHERE striker = $1 GROUP BY striker) t2, \
       (SELECT player_id, count(case when runs >= 50 and runs < 100 Then 1 end) fifties, max(runs) hs \
       FROM (SELECT striker player_id, sum(runs_scored) runs FROM ball_by_ball WHERE striker = $2 \
       GROUP BY striker, match_id) t1 GROUP BY player_id) t3, \
       (SELECT " +
      player_id +
      " player_id, count(distinct match_id) matches_batted FROM ball_by_ball \
       WHERE striker = $3 or non_striker = $4 GROUP BY player_id) t4 \
       WHERE t2.player_id = t3.player_id and t2.player_id = t4.player_id;";
    pool.query(
      query_2,
      [player_id, player_id, player_id, player_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });

  const bowlingInfo = new Promise(function (resolve, reject) {
    query_2 =
      "SELECT t2.player_id, matches_bowled, runs_given, balls_bowled, overs_bowled, wickets, economy, five \
      FROM (SELECT bowler player_id, count(distinct match_id) matches_bowled, \
      sum(runs_scored) runs_given, count(*) balls_bowled, count(out_type) wickets, \
      ROUND(sum(runs_scored) * 1.0 / greatest(count(distinct CAST(match_id as text) || '-' || CAST(over_id as text)), 1), 2) economy, \
      count(distinct CAST(match_id as text) || '-' || CAST(over_id as text)) overs_bowled \
      FROM ball_by_ball WHERE bowler = $1 Group by bowler) t2, \
      (SELECT player_id, count(case when wicket >= 5 then 1 end) five \
      FROM (SELECT bowler player_id, count(out_type) wicket \
      FROM ball_by_ball WHERE bowler = $2 Group by bowler, match_id) t1 GROUP BY player_id) t3 \
      WHERE t2.player_id = t3.player_id;";
    pool.query(query_2, [player_id, player_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const battingChart = new Promise(function (resolve, reject) {
    query_2 =
      "SELECT match_id, sum(runs_scored) runs FROM ball_by_ball WHERE striker = $1 GROUP BY striker, match_id \
      ORDER BY match_id;";
    pool.query(query_2, [player_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const bowlingChart = new Promise(function (resolve, reject) {
    query_2 =
      "SELECT match_id, count(out_type) wickets, sum(runs_scored) runs_given \
        FROM ball_by_ball WHERE bowler = $1 GROUP BY bowler, match_id ORDER BY match_id";
    pool.query(query_2, [player_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([
    playerInfo,
    battingInfo,
    bowlingInfo,
    battingChart,
    bowlingChart,
  ]).then(
    function (values) {
      return {
        playerInfo: values[0],
        battingInfo: values[1],
        bowlingInfo: values[2],
        battingChart: values[3],
        bowlingChart: values[4],
      };
    },
    function (error) {
      throw error;
    }
  );
};

module.exports = { getPlayers, getPlayerInfo };
