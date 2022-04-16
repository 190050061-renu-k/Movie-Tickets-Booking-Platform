const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getSomeInfo = (body) => {
  const { match_id } = body;
  const batTeams = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT team.team_name, t1.innings_no \
        FROM team,(SELECT team_id, innings_no FROM ball_by_ball, player_match \
        WHERE ball_by_ball.match_id = $1 AND \
        ball_by_ball.match_id = player_match.match_id AND player_match.player_id = ball_by_ball.striker GROUP BY innings_no, team_id)t1 \
        WHERE team.team_id = t1.team_id;";
    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
  const Bowl = new Promise(function (resolve, reject) {
    query_1 =
      "SELECT player.player_id, innings_no, player_name, count(*) balls_bowled, sum(runs_scored) runs_given, count(case when out_type IS not NULL THEN 1 END) wickets \
        FROM ball_by_ball, player WHERE bowler = player_id and match_id = $1 GROUP BY innings_no, player_name, player.player_id";
    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const Bat = new Promise(function (resolve, reject) {
    const query_1 =
      "SELECT player.player_id, player_name, T.innings_no, T.sixes, T.fours, T.balls_faced, T.total_runs \
        FROM player, \
        (SELECT innings_no, striker, count(case when runs_scored = 6 then 1 end) sixes, \
        count(case when runs_scored = 4 then 1 end) fours, count(striker) balls_faced, sum(runs_scored) total_runs \
        FROM ball_by_ball \
        WHERE match_id = $1 \
        GROUP BY ball_by_ball.innings_no, ball_by_ball.striker)T \
        WHERE player.player_id = T.striker;";
    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const matchinfo = new Promise(function (resolve, reject) {
    const query_1 =
      "SELECT match_id, t1.team_name team1_name, t2.team_name team2_name, season_year, t3.team_name toss_winner, t4.team_name match_winner, venue_name, city_name, country_name, win_type, win_margin \
    FROM match, team t1, team t2, team t3, team t4, venue \
    WHERE match.match_winner = t4.team_id and match_id = $1 and match.toss_winner = t3.team_id and match.team1 = t1.team_id and match.team2 = t2.team_id and match.venue_id = venue.venue_id;";

    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const umpires = new Promise(function (resolve, reject) {
    const query_1 =
      "SELECT umpire_name, role_desc FROM umpire, umpire_match WHERE match_id = $1 and umpire.umpire_id = umpire_match.umpire_id;";

    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const team1 = new Promise(function (resolve, reject) {
    const query_1 =
      "SELECT player_name FROM player, player_match, match WHERE player_match.team_id = match.team1 and player.player_id = player_match.player_id and player_match.match_id = match.match_id and match.match_id = $1;";

    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const team2 = new Promise(function (resolve, reject) {
    const query_1 =
      "SELECT player_name FROM player, player_match, match WHERE player_match.team_id = match.team2 and player.player_id = player_match.player_id and player_match.match_id = match.match_id and match.match_id = $1;";

    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const getScore = new Promise(function (resolve, reject) {
    const { match_id } = body;
    query_1 =
      "SELECT innings_no, over_id, sum(runs_scored + extra_runs) runs, count(out_type) wickets FROM ball_by_ball WHERE match_id = $1 GROUP BY innings_no, over_id ORDER BY innings_no, over_id;";
    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const getSummary = new Promise(function (resolve, reject) {
    const { match_id } = body;
    query_1 =
      "SELECT innings_no, count(distinct over_id) overs, count(out_type) total_wickets, sum(runs_scored + extra_runs) total_runs, sum(extra_runs) extras FROM ball_by_ball WHERE match_id = $1 GROUP BY innings_no ORDER BY innings_no;";
    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const getTopBatters = new Promise(function (resolve, reject) {
    const { match_id } = body;
    query_1 =
      "with ranked as (SELECT innings_no, player_name, player_id, count(*) balls_faced, sum(runs_scored) total_runs, rank() over (partition by innings_no order by sum(runs_scored) desc, count(*) asc, player_name asc) ranking FROM ball_by_ball, player WHERE player_id = striker and match_id = $1 GROUP BY innings_no, player_id ORDER BY innings_no) \
      SELECT innings_no, player_name, player_id, balls_faced, total_runs FROM ranked WHERE ranking < 4 and total_runs > 0;";

    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const getTopBowlers = new Promise(function (resolve, reject) {
    const { match_id } = body;
    query_1 =
      "with ranked as (SELECT innings_no, player_name, player_id, count(*) balls_bowled, sum(runs_scored) runs_given, count(out_type) wickets_taken, rank() over (partition by innings_no order by count(out_type) desc, sum(runs_scored) asc, player_name asc) ranking FROM ball_by_ball, player WHERE player_id = bowler and match_id = $1 GROUP BY innings_no, player_id ORDER BY innings_no) \
SELECT innings_no, player_name, player_id, balls_bowled, runs_given, wickets_taken FROM ranked WHERE ranking < 4 and wickets_taken > 0;";
    pool.query(query_1, [match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  const getRunsSummary = new Promise(function (resolve, reject) {
    const { match_id } = body;
    const query_1 =
      "(SELECT innings_no, runs_scored run_type, sum(runs_scored) runs FROM ball_by_ball WHERE match_id = $1 and runs_scored > 0 GROUP BY innings_no, runs_scored) \
    UNION \
    (SELECT innings_no, 7 run_type, sum(extra_runs) runs FROM ball_by_ball WHERE match_id = $2 GROUP BY innings_no) ORDER BY run_type;";
    pool.query(query_1, [match_id, match_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });

  return Promise.all([
    batTeams,
    Bowl,
    Bat,
    matchinfo,
    umpires,
    team1,
    team2,
    getScore,
    getSummary,
    getTopBatters,
    getTopBowlers,
    getRunsSummary,
  ]).then(
    function (values) {
      return {
        batTeams: values[0],
        Bowl: values[1],
        Bat: values[2],
        matchinfo: values[3],
        umpires: values[4],
        team1: values[5],
        team2: values[6],
        score: values[7],
        summary: values[8],
        topBatters: values[9],
        topBowlers: values[10],
        getRunsSummary: values[11],
      };
    },
    function (error) {
      throw error;
    }
  );
};

module.exports = {
  getSomeInfo,
};
