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

const auth = require("./auth");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token");

  next();
});

app.post("/getProfile", auth, async (req, res) => {
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

app.post("/getMovieInfo", async (req, res) => {
  try {
    response = await movie_model.getMovieInfo(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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

app.post("/getUnavailableSeats", (req, res) => {
  show_model
    .getUnavailableSeats(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getShowDetails", (req, res) => {
  show_model
    .getShowDetails(req.body)
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

app.get("/getUpcomingMovies", (req, res) => {
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

app.post("/getTheatreShows", async (req, res) => {
  try {
    response = await theatre_model.getTheatreShows(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/getTheatreShows2", async (req, res) => {
  try {
    response = await theatre_model.getTheatreShows2(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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

app.post("/getTheatresInRange", (req, res) => {
  theatre_model
    .getTheatresInRange(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getBookingHistory", (req, res) => {
  user_model
    .getBookingHistory(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/userLogin", (req, res) => {
  user_model
    .userLogin(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/changePassword", async (req, res) => {
  try {
    response = await user_model.changePassword(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/addArtist", (req, res) => {
  artist_model
    .addArtist(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/getAdminAnalytics", (req, res) => {
  analytics_model
    .getAdminAnalytics()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getTheatreMovies", (req, res) => {
  theatre_model
    .getTheatreMovies(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getOnlineVsOffline", async (req, res) => {
  try {
    response = await analytics_model.getOnlineVsOffline(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/getLanguageMovies", async (req, res) => {
  try {
    console.log(req.body);
    response = await movie_model.getLanguageMovies(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/getGenreMovies", async (req, res) => {
  try {
    response = await movie_model.getGenreMovies(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/getMovieTheatres", async (req, res) => {
  try {
    response = await movie_model.getMovieTheatres(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/signUp", async (req, res) => {
  try {
    response = await user_model.signUp(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/editProfile", async (req, res) => {
  try {
    response = await user_model.editProfile();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/bookSeats", auth, async (req, res) => {
  try {
    response = await show_model.bookSeats(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/registerTheatre", async (req, res) => {
  try {
    response = await theatre_model.registerTheatre(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/addMovie", (req, res) => {
  movie_model
    .addMovie(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/getShowSlots", (req, res) => {
  show_model
    .getShowSlots(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/selectShows", (req, res) => {
  show_model
    .selectShows(req.body)
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
