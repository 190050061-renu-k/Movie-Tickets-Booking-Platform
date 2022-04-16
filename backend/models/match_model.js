const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getMatches = (body) => {
  return new Promise(function (resolve, reject) {
    const { skips, limit } = body;
    pool.query(
      "SELECT named.match_id, named.T1, named.T2, named.W,  venue.venue_name, venue.city_name, venue.country_name, named.Y season_year " +
        "FROM (SELECT match.match_id, t1.team_name T1, t2.team_name T2, winner.team_name W, match.venue_id, match.season_year Y " +
        "FROM match, team t1, team t2, team winner " +
        "WHERE match.match_winner = winner.team_id AND match.team1 = t1.team_id AND match.team2 = t2.team_id) named, " +
        "venue " +
        "WHERE venue.venue_id = named.venue_id " +
        "ORDER BY named.Y DESC, named.match_id ASC OFFSET $1 LIMIT $2;",
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

module.exports = {
  getMatches,
};
