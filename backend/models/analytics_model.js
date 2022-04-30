const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getMovieRatings = () => {
  const query = `SELECT movies.movie_id, movies.name, AVG(rating) as avg_rating
  FROM user_movie, movies where user_movie.movie_id = movies.movie_id and movies.movie_id in (
select distinct movie_id from shows where show_date + interval '1 year' + interval '3 month' + interval '25 day' >= CURRENT_DATE - INTERVAL '6 days')
  GROUP BY movies.movie_id, movies.name;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(results.rows);
      resolve(results.rows);
    });
  });
};

const getTheatreRatings = () => {
  const query = `SELECT theatres.theatre_id, theatres.name as theatre_name, AVG(rating) as rating
  FROM user_theatre, theatres WHERE user_theatre.theatre_id = theatres.theatre_id
  GROUP BY theatres.theatre_id, theatres.name;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getGenreChoice = () => {
  const query = `SELECT genres.genre_id, genres.name, SUM(seats_for_show.seats_booked) as audience 
  FROM movies, movie_genres, shows, genres, 
  (SELECT show_id, count(seat_id) seats_booked FROM bookings NATURAL INNER JOIN booking_seat GROUP BY show_id) seats_for_show 
  WHERE movies.movie_id = movie_genres.movie_id AND shows.movie_id = movies.movie_id AND shows.show_id = seats_for_show.show_id
  AND genres.genre_id = movie_genres.genre_id AND shows.show_date + interval '1 year' + interval '3 month' + interval '25 day' >= CURRENT_DATE -INTERVAL '6 days'
  GROUP BY genres.genre_id, genres.name;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getLanguageChoice = () => {
  const query = `SELECT languages.language_id, languages.name, SUM(seats_for_show.seats_booked) as audience
  FROM movies, movie_languages, shows, languages, 
  (SELECT show_id, count(seat_id) seats_booked FROM bookings NATURAL INNER JOIN booking_seat GROUP BY show_id) seats_for_show 
  WHERE movies.movie_id = movie_languages.movie_id AND shows.movie_id = movies.movie_id AND shows.show_id = seats_for_show.show_id
  AND languages.language_id = movie_languages.language_id AND shows.show_date + interval '1 year' + interval '3 month' + interval '25 day' >= CURRENT_DATE -INTERVAL '6 days'
  GROUP BY languages.language_id, languages.name;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getAudiencePercent = (body) => {
  const { movie_id } = body;
  const query = `SELECT theatres.theatre_id, theatres.name,  SUM(seats_for_show.seats_booked) audience FROM theatres, shows, 
    (SELECT show_id, count(seat_id) seats_booked FROM bookings NATURAL INNER JOIN booking_seat GROUP BY show_id) seats_for_show 
    WHERE theatres.theatre_id = shows.theatre_id and shows.show_id = seats_for_show.show_id AND shows.movie_id = $1
    GROUP BY theatres.theatre_id, theatres.name;`;
  return new Promise(function (resolve, reject) {
    pool.query(query, [movie_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getOnlineVsOffline = async (body) => {
  const { theatre_id } = body;
  const client = await pool.connect();
  console.log(theatre_id);
  try {
    await client.query("BEGIN");
    console.log('try');
    const query1 =
      `SELECT book_date, coalesce(num_seats,0) as num_seats from 
      (SELECT date_trunc('day', dd):: date as book_date FROM generate_series
      (CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, '1 day'::interval) dd) as t1 natural left outer join
      (SELECT count(seat_id) as num_seats, book_date from booking_seat,bookings where booking_seat.booking_id = bookings.booking_id
      and bookings.book_type = 'online' and bookings.show_id in
      (SELECT show_id from shows WHERE theatre_id = $1 ) 
      and book_date + interval '1 year' + interval '3 month' + interval '25 day' >= CURRENT_DATE - INTERVAL '6 days' and book_date + interval '1 year' + interval '3 month' + interval '25 day' <= CURRENT_DATE
      group by book_date order by book_date) as t2`;
    const res1 = await client.query(query1, [theatre_id]);
    console.log('res1');
    console.log(res1.rows);
    const query2 =
      `SELECT book_date, coalesce(num_seats,0) as num_seats from 
      (SELECT date_trunc('day', dd):: date as book_date FROM generate_series
      (CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, '1 day'::interval) dd) as t1 natural left outer join
      (SELECT count(seat_id) as num_seats, book_date from booking_seat,bookings where booking_seat.booking_id = bookings.booking_id
      and bookings.book_type = 'offline' and bookings.show_id in
      (SELECT show_id from shows WHERE theatre_id = $1 ) 
      and book_date + interval '1 year' + interval '3 month' + interval '25 day' >= CURRENT_DATE - INTERVAL '6 days' and book_date + interval '1 year' + interval '3 month' + interval '25 day' <= CURRENT_DATE
      group by book_date order by book_date) as t2`;
    const res2 = await client.query(query2, [theatre_id]);
    console.log('res2');
    console.log(res2.rows);
    await client.query("COMMIT");
    return { online: res1.rows, offline: res2.rows };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getAdminAnalytics = () => {
  const query1 = `SELECT theatres.theatre_id, theatres.name as theatre_name, show_online_offline.book_type, SUM(show_online_offline.seats_booked) sum_seats 
  FROM theatres, shows,
  (SELECT book_type, show_id, count(seat_id) seats_booked FROM bookings NATURAL INNER JOIN booking_seat GROUP BY book_type, show_id) show_online_offline
  WHERE theatres.theatre_id = shows.theatre_id AND shows.show_id = show_online_offline.show_id 
and shows.show_date + interval '1 year' + interval '3 month' + interval '25 day' >= CURRENT_DATE - INTERVAL '6 days'
and shows.show_date + interval '1 year' + interval '3 month' + interval '25 day' <= CURRENT_DATE
  GROUP BY theatres.theatre_id, theatres.name, show_online_offline.book_type order by theatre_name;`;
  return new Promise(function (resolve, reject) {
    pool.query(query1, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = {
  getMovieRatings,
  getTheatreRatings,
  getGenreChoice,
  getLanguageChoice,
  getAudiencePercent,
  getAdminAnalytics,
  getOnlineVsOffline,
};
