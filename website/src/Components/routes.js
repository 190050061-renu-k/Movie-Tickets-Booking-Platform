import MatchDetails from "Components/views/MatchDetails";
import Matches from "Components/views/Matches.js";
import ScoreChart from "Components/views/ScoreComp";
import Players from "Components/views/Players";
import Player from "Components/views/Player";
import Points from "Components/views/Points";
import AllVenues from "Components/views/AllVenues";
import Venue from "Components/views/Venue";
import AddVenue from "Components/views/AddVenue";
import Signup from "./newpages/user-pages/Signup";
import Login from "./newpages/user-pages/Login";
import MovieDetails from "./newpages/details/MovieDetails";
import ArtistDetails from "./newpages/details/ArtistDetails";
import TheatreList from "./newpages/lists/TheatreList";
import TheatreDetails from "./newpages/details/TheatreDetails";
import UserDetails from "./newpages/details/UserDetails";
import SeatSelection from "./newpages/booking/SeatSelection";

var routes = [
  {
    path: "/players/:player_id",
    name: "Player",
    icon: "nc-icon nc-pin-3",
    component: Player,
    layout: "",
  },
  {
    path: "/players",
    name: "Players",
    icon: "nc-icon nc-pin-3",
    component: Players,
    layout: "",
  },
  {
    path: "/matches/:match_id",
    name: "Match",
    icon: "nc-icon nc-caps-small",
    component: MatchDetails,
    layout: "",
  },
  {
    path: "/matches",
    name: "Matches",
    icon: "nc-icon nc-tile-56",
    component: Matches,
    layout: "",
  },

  {
    path: "/scorecomp",
    name: "Score",
    icon: "nc-icon nc-tile-56",
    component: ScoreChart,
    layout: "",
  },
  {
    path: "/pointstable/:year",
    name: "Points",
    icon: "nc-icon nc-pin-3",
    component: Points,
    layout: "",
  },
  {
    path: "/venue/:venue_id",
    name: "Venue",
    icon: "nc-icon nc-pin-3",
    component: Venue,
    layout: "",
  },
  {
    path: "/venues/add",
    name: "Add New Venue",
    icon: "nc-icon nc-pin-3",
    component: AddVenue,
    layout: "",
  },
  {
    path: "/venues",
    name: "Venues",
    icon: "nc-icon nc-pin-3",
    component: AllVenues,
    layout: "",
  },
  {
    path: "/signup",
    name: "Register",
    icon: "nc-icon nc-pin-3",
    component: Signup,
    layout: "",
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-pin-3",
    component: Login,
    layout: "",
  },
  {
    path: "/movies/:movie_id", // movies/:id to be done
    name: "Movie Details",
    icon: "nc-icon nc-pin-3",
    component: MovieDetails,
    layout: "",
  },
  {
    path: "/artists/:artist_id", // artist/:id to be done
    name: "Artist Details",
    icon: "nc-icon nc-pin-3",
    component: ArtistDetails,
    layout: "",
  },
  {
    path: "/theatres/:theatre_id", // artist/:id to be done
    name: "Theatres",
    icon: "nc-icon nc-pin-3",
    component: TheatreDetails,
    layout: "",
  },
  {
    path: "/theatres", // artist/:id to be done
    name: "Theatres",
    icon: "nc-icon nc-pin-3",
    component: TheatreList,
    layout: "",
  },
  {
    path: "/profile", // artist/:id to be done
    name: "Profile",
    icon: "nc-icon nc-pin-3",
    component: UserDetails,
    layout: "",
  },
  {
    path: "/seats", // artist/:id to be done
    name: "Seats",
    icon: "nc-icon nc-pin-3",
    component: SeatSelection,
    layout: "",
  },
];

var sidebar_display = [
  {
    path: "/matches",
    name: "Matches",
    icon: "nc-icon nc-tile-56",
    component: Matches,
    layout: "",
  },
  {
    path: "/players",
    name: "Players",
    icon: "nc-icon nc-user-run",
    component: Players,
    layout: "",
  },
  {
    path: "/pointstable/0",
    name: "Points",
    icon: "nc-icon nc-trophy",
    component: Points,
    layout: "",
  },

  {
    path: "/venues",
    name: "Venues",
    icon: "nc-icon nc-pin-3",
    component: AllVenues,
    layout: "",
  },
  {
    path: "/venues/add",
    name: "Add New Venue",
    icon: "nc-icon nc-simple-add",
    component: AddVenue,
    layout: "",
  },
  {
    path: "/signup",
    name: "Register",
    icon: "nc-icon nc-simple-add",
    component: Signup,
    layout: "",
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-pin-3",
    component: Login,
    layout: "",
  },
  {
    path: "/moviedetails", // movies/:id to be done
    name: "Movie Details",
    icon: "nc-icon nc-pin-3",
    component: MovieDetails,
    layout: "",
  },
  {
    path: "/artistdetails", // artist/:id to be done
    name: "Artist Details",
    icon: "nc-icon nc-pin-3",
    component: ArtistDetails,
    layout: "",
  },
  {
    path: "/theatres", // artist/:id to be done
    name: "Theatres",
    icon: "nc-icon nc-pin-3",
    component: TheatreList,
    layout: "",
  },
  {
    path: "/profile", // artist/:id to be done
    name: "Profile",
    icon: "nc-icon nc-pin-3",
    component: UserDetails,
    layout: "",
  },
  {
    path: "/seats", // artist/:id to be done
    name: "Seats",
    icon: "nc-icon nc-pin-3",
    component: SeatSelection,
    layout: "",
  },
];

export default routes;
export { sidebar_display };
