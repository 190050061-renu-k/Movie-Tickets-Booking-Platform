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
import HomePage from "./newpages/HomePage";
import SeatSelection from "./newpages/booking/SeatSelection";
import PaymentPage from "./newpages/payment/PaymentPage";
import ConfirmationPage from "./newpages/payment/ConfirmationPage";
import TheatreHomePage from "./newpages/theatre-pages/HomePage";
import MovieTheatreList from "./newpages/lists/MovieTheatreList";
import AddMovieShowPage from "./newpages/theatre-pages/AddMovie";
import Analytics from "./newpages/theatre-pages/Analytics";
import AdminHomePage from "./newpages/admin-pages/HomePage";

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
    path: "/movies/:movie_id",
    name: "Movie Details",
    icon: "nc-icon nc-pin-3",
    component: MovieDetails,
    layout: "",
  },
  {
    path: "/artists/:artist_id",
    name: "Artist Details",
    icon: "nc-icon nc-pin-3",
    component: ArtistDetails,
    layout: "",
  },
  {
    path: "/theatres/analytics", 
    name: "Theatre Analytics",
    icon: "nc-icon nc-pin-3",
    component: Analytics,
    layout: "",
  },
  {
    path: "/theatres/homepage", 
    name: "Theatre HomePage",
    icon: "nc-icon nc-pin-3",
    component: TheatreHomePage,
    layout: "",
  },
  {
    path: "/theatres/addmovie", // artist/:id to be done
    name: "Theatre Add Movie Page",
    icon: "nc-icon nc-pin-3",
    component: AddMovieShowPage,
    layout: "",
  },
  {
    path: "/theatres/:theatre_id", // theatre/:id to be done
    name: "Theatres",
    icon: "nc-icon nc-pin-3",
    component: TheatreDetails,
    layout: "",
  },
  {
    path: "/theatres",
    name: "Theatres",
    icon: "nc-icon nc-pin-3",
    component: TheatreList,
    layout: "",
  },
  {
    path: "/profile", // gets id from the saved state
    name: "Profile",
    icon: "nc-icon nc-pin-3",
    component: UserDetails,
    layout: "",
  },
  {
    path: "/homepage",
    name: "Home Page",
    icon: "nc-icon nc-pin-3",
    component: HomePage,
    layout: "",
  },
  {
    path: "/seats/:show_id", // artist/:id to be done
    name: "Seats",
    icon: "nc-icon nc-pin-3",
    component: SeatSelection,
    layout: "",
  },
  {
    path: "/payment", // artist/:id to be done
    name: "Payment",
    icon: "nc-icon nc-pin-3",
    component: PaymentPage,
    layout: "",
  },
  {
    path: "/confirmation", // artist/:id to be done
    name: "Booking Confirmation",
    icon: "nc-icon nc-pin-3",
    component: ConfirmationPage,
    layout: "",
  },
  {
    path: "/movietheatrelist/:movieid", // :movieid to be done
    name: "Movie Theatre List",
    icon: "nc-icon nc-pin-3",
    component: MovieTheatreList,
    layout: "",
  },
  {
    path: "/admin/homepage", // :movieid to be done
    name: "Admin Homepage",
    icon: "nc-icon nc-pin-3",
    component: AdminHomePage,
    layout: "",
  }
  
  
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
    path: "/artistdetails",
    name: "Artist Details",
    icon: "nc-icon nc-pin-3",
    component: ArtistDetails,
    layout: "",
  },
  {
    path: "/theatres/analytics", // :movieid to be done
    name: "Theatre Analytics",
    icon: "nc-icon nc-pin-3",
    component: Analytics,
    layout: "",
  },
  {
    path: "/theatres/homepage", 
    name: "Theatre HomePage",
    icon: "nc-icon nc-pin-3",
    component: TheatreHomePage,
    layout: "",
  },
  {
    path: "/theatres/addmovie", // artist/:id to be done
    name: "Theatre Add Movie Page",
    icon: "nc-icon nc-pin-3",
    component: AddMovieShowPage,
    layout: "",
  },
  {
    path: "/theatres",
    name: "Theatres",
    icon: "nc-icon nc-pin-3",
    component: TheatreList,
    layout: "",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-pin-3",
    component: UserDetails,
    layout: "",
  },
  {
    path: "/homepage",
    name: "Home Page",
    icon: "nc-icon nc-pin-3",
    component: HomePage,
    layout: "",
  },
  {
    path: "/seats/:show_id", // seats/:movieid to be done
    name: "Seats",
    icon: "nc-icon nc-pin-3",
    component: SeatSelection,
    layout: "",
  },
  {
    path: "/payment", // payment:bookingid to be done
    name: "Payment",
    icon: "nc-icon nc-pin-3",
    component: PaymentPage,
    layout: "",
  },
  {
    path: "/confirmation", // confirmation:bookingid to be done
    name: "Booking Confirmation",
    icon: "nc-icon nc-pin-3",
    component: ConfirmationPage,
    layout: "",
  },
  {
    path: "/admin/homepage", // :movieid to be done
    name: "Admin Homepage",
    icon: "nc-icon nc-pin-3",
    component: AdminHomePage,
    layout: "",
  }
];

export default routes;
export { sidebar_display };
