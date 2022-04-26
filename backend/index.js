const express = require("express");
require("dotenv").config();
const app = express();
const port = 3001;

const user_model = require("./models/user_model");
const movie_model = require("./models/movie_model");
const show_model = require("./models/show_model");
const artist_model = require("./models/artist_model");
const theatre_model = require("./models/theatre_model");
const analytics_model = require("./models/analytics_model");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.post("/getProfile", async (req, res) => {
  try {
    response = await user_model.getProfile(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/getMovies", (req, res) => {
  movie_model
    .getMovies(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getMovieInfo", (req, res) => {
  movie_model
    .getMovieInfo(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getArtistInfo", (req, res) => {
  artist_model
    .getArtistInfo(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getTheatreMovieShows", (req, res) => {
  show_model
    .getTheatreMovieShows(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getAvailableSeats", (req, res) => {
  show_model
    .getAvailableSeats(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/rateMovie", (req, res) => {
  movie_model
    .rateMovie(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getUpcomingMovies", (req, res) => {
  movie_model
    .getUpcomingMovies(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/setPreference", (req, res) => {
  movie_model
    .setPreference(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getRecommendations", (req, res) => {
  user_model
    .getRecommendations(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getRecommendations", (req, res) => {
  user_model
    .getRecommendations(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getTheatres", (req, res) => {
  theatre_model
    .getTheatres(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getTheatreShows", (req, res) => {
  theatre_model
    .getTheatreShows(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/rateTheatre", (req, res) => {
  theatre_model
    .rateTheatre(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/getMovieRatings", (req, res) => {
  analytics_model
    .getMovieRatings(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/getTheatreRatings", (req, res) => {
  analytics_model
    .getTheatreRatings()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/getGenreChoice", (req, res) => {
  analytics_model
    .getGenreChoice()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/getLanguageChoice", (req, res) => {
  analytics_model
    .getLanguageChoice()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getAudiencePercent", (req, res) => {
  analytics_model
    .getAudiencePercent(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/filtermovies", (req, res) => {
  movie_model
    .getfilteredmovies(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/gettheatresinrange", (req, res) => {
  theatre_model
    .theatres_within_range(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getbookinghistory", (req, res) => {
  user_model
    .bookinghistory(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/userlogin", (req, res) => {
  user_model
    .userlogin(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/changepassword", (req, res) => {
  user_model
    .passwordchange(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/addartist", (req, res) => {
  artist_model
    .addartist(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/onlinevsoffline", (req, res) => {
  analytics_model
    .onlinevsoffline()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/moviesaired", (req, res) => {
  theatre_model
    .movies_aired(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
