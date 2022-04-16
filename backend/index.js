const express = require("express");
require("dotenv").config();
const app = express();
const port = 3001;

const user_model = require("./models/user_model");

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

app.post("/getProfile", (req, res) => {
  match_model
    .getMatches(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// app.post("/getInfo", (req, res) => {
//   inn_model
//     .getSomeInfo(req.body)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// //fetches players --> player_id, player_name, country_name
// app.post("/getPlayers", (req, res) => {
//   player_model
//     .getPlayers(req.body)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.get("/getYears", (req, res) => {
//   points_model
//     .getYears()
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.get("/getVenues", (req, res) => {
//   venue_model
//     .getVenues()
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.post("/getPlayerInfo", (req, res) => {
//   player_model
//     .getPlayerInfo(req.body)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.post("/getPoints", (req, res) => {
//   points_model
//     .getPoints(req.body)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.post("/getVenueInfo", (req, res) => {
//   venue_model
//     .getVenueInfo(req.body)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.post("/addVenue", (req, res) => {
//   venue_model
//     .addVenue(req.body)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send(error);
//     });
// });

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`);
// });
