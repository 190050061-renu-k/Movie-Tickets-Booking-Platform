const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getPoints = (body) => {
  const { year } = body;

  const years = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT DISTINCT season_year FROM match ORDER BY season_year DESC";
    pool.query(query_1, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
  const teams = new Promise(function (resolve, reject) {
    query_1 = "SELECT * FROM team order by team_id;";
    pool.query(query_1, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const matches = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COUNT(case when (team_id = team1 OR team_id = team2) then 1 end) matches \
        FROM team, match  WHERE season_year = $1 \
        GROUP BY team_id \
        ORDER BY team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const wins = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COUNT(case when team_id=match_winner then 1 end) wins \
        FROM team, match WHERE season_year = $1 \
        GROUP BY team_id \
        ORDER BY team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const ties = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COUNT(case when ((team_id = team1 OR team_id = team2) AND win_type is NULL) then 1 end) ties\
        FROM team, match WHERE season_year = $1 \
        GROUP BY team_id \
        ORDER BY team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const runs_played = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COALESCE(team_play.runs_team,0) total_runs \
    FROM team \
    LEFT OUTER JOIN \
    (SELECT team_id, SUM(play.runs_player) runs_team \
    FROM player_match, \
    (SELECT SUM(runs_scored+extra_runs) runs_player, striker, match.match_id \
    FROM match, ball_by_ball \
    WHERE match.season_year = $1 AND match.match_id = ball_by_ball.match_id \
    GROUP BY striker, match.match_id) play \
    WHERE player_match.player_id = play.striker AND player_match.match_id = play.match_id \
    GROUP BY team_id)team_play \
    ON team.team_id = team_play.team_id \
    ORDER BY team.team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const runs_conceded = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COALESCE(team_play.runs_team,0) runs_conceded \
      FROM team \
      LEFT OUTER JOIN \
      (SELECT team_id, SUM(play.runs_player) runs_team \
      FROM player_match, \
      (SELECT SUM(runs_scored+extra_runs) runs_player, bowler, match.match_id \
      FROM match, ball_by_ball \
      WHERE match.season_year = $1 AND match.match_id = ball_by_ball.match_id \
      GROUP BY bowler, match.match_id) play \
      WHERE player_match.player_id = play.bowler AND player_match.match_id = play.match_id \
      GROUP BY team_id)team_play \
      ON team.team_id = team_play.team_id \
      ORDER BY team.team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const balls_bowled = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COALESCE(team_play.balls_total,0) balls_bowled \
      FROM team \
      LEFT OUTER JOIN \
      (SELECT team_id, SUM(play.balls_player) balls_total \
      FROM player_match, \
      (SELECT Count(ball_id) balls_player, bowler, match.match_id \
      FROM match, ball_by_ball \
      WHERE match.season_year = $1 AND match.match_id = ball_by_ball.match_id \
      GROUP BY bowler, match.match_id) play \
      WHERE player_match.player_id = play.bowler AND player_match.match_id = play.match_id \
      GROUP BY team_id)team_play \
      ON team.team_id = team_play.team_id \
      ORDER BY team.team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const balls_faced = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT COALESCE(team_play.balls_total,0) balls_faced \
      FROM team \
      LEFT OUTER JOIN \
      (SELECT team_id, SUM(play.balls_player) balls_total \
      FROM player_match, \
      (SELECT Count(ball_id) balls_player, striker, match.match_id \
      FROM match, ball_by_ball \
      WHERE match.season_year = $1 AND match.match_id = ball_by_ball.match_id \
      GROUP BY striker, match.match_id) play \
      WHERE player_match.player_id = play.striker AND player_match.match_id = play.match_id \
      GROUP BY team_id)team_play \
      ON team.team_id = team_play.team_id \
      ORDER BY team.team_id;";
    pool.query(query_1, [year], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([
    teams,
    matches,
    wins,
    ties,
    runs_played,
    runs_conceded,
    balls_bowled,
    balls_faced,
    years,
  ]).then(
    function (values) {
      return {
        teams: values[0],
        matches: values[1],
        wins: values[2],
        ties: values[3],
        runs_played: values[4],
        runs_conceded: values[5],
        balls_bowled: values[6],
        balls_faced: values[7],
        years: values[8],
      };
    },
    function (error) {
      throw error;
    }
  );
};

module.exports = {
  getPoints,
};
