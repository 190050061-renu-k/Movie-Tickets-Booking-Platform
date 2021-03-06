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
import RegisterTheatre from "./newpages/admin-pages/RegisterTheatre";
import AddArtist from "./newpages/admin-pages/AddArtist";
import TheatreLiveOnline from "./newpages/admin-pages/TheatresLiveOnline";
import AddMovie from "./newpages/admin-pages/AddMovie";
import MainPage from "./newpages/MainPage";
import UserRating from "./newpages/user-pages/UserRating";
import { useState } from "react";

var role = localStorage.getItem("role");
var user = JSON.parse(localStorage.getItem("user"));

var routes = [
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
    path: "/admin/addmovie",
    name: "Add Movie",
    icon: "nc-icon nc-pin-3",
    component: AddMovie,
    layout: "",
  },
  {
    path: "/admin/analytics",
    name: "Admin Analytics",
    icon: "nc-icon nc-pin-3",
    component: TheatreLiveOnline,
    layout: "",
  },

  // {
  //   path: "/theatres/livebookings",
  //   name: "Live Bookings",
  //   icon: "nc-icon nc-pin-3",
  //   component: LiveBooking,
  //   layout: "",
  // },
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
    path: "/theatres/addmovie",
    name: "Theatre Add Movie Page",
    icon: "nc-icon nc-pin-3",
    component: AddMovieShowPage,
    layout: "",
  },
  {
    path: "/theatres/:theatre_id",
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
    icon: "nc-icon nc-circle-10",
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
    path: "/seats/:show_id",
    name: "Seats",
    icon: "nc-icon nc-pin-3",
    component: SeatSelection,
    layout: "",
  },
  {
    path: "/payment",
    name: "Payment",
    icon: "nc-icon nc-pin-3",
    component: PaymentPage,
    layout: "",
  },
  {
    path: "/confirmation",
    name: "Booking Confirmation",
    icon: "nc-icon nc-pin-3",
    component: ConfirmationPage,
    layout: "",
  },
  {
    path: "/movietheatrelist/:movie_id", // :movieid to be done
    name: "Movie Theatre List",
    icon: "nc-icon nc-pin-3",
    component: MovieTheatreList,
    layout: "",
  },
  {
    path: "/admin/homepage",
    name: "Admin Homepage",
    icon: "nc-icon nc-pin-3",
    component: AdminHomePage,
    layout: "",
  },
  {
    path: "/admin/registertheatre", // :movieid to be done
    name: "Register Theatre Page",
    icon: "nc-icon nc-pin-3",
    component: RegisterTheatre,
    layout: "",
  },
  {
    path: "/admin/addartist", // :movieid to be done
    name: "Add Artist",
    icon: "nc-icon nc-pin-3",
    component: AddArtist,
    layout: "",
  },
  {
    path: "/rating", // :movieid to be done
    name: "Rating",
    icon: "nc-icon nc-pin-3",
    component: UserRating,
    layout: "",
  },
  {
    path: "/", // :movieid to be done
    name: "Select Role",
    icon: "nc-icon nc-pin-3",
    component: MainPage,
    layout: "",
  },
];

var sidebar_display;

if (role == "user") {
  sidebar_display = [
    {
      path: "/profile",
      name: "Profile",
      role: "user",
      icon: "nc-icon nc-circle-10",
      component: UserDetails,
      layout: "",
    },
    {
      path: "/homepage",
      name: "Home Page",
      icon: "nc-icon nc-shop",
      component: HomePage,
      layout: "",
    },
    {
      path: "/", // :movieid to be done
      name: "Select Role",
      icon: "nc-icon nc-lock-circle-open",
      component: MainPage,
      layout: "",
    },
    {
      path: "/theatres",
      name: "Theatres",
      icon: "nc-icon nc-pin-3",
      component: TheatreList,
      layout: "",
    },
  ];
} else if (role == "theatre") {
  sidebar_display = [
    {
      path: "/theatres/analytics", // :movieid to be done
      name: "Theatre Analytics",
      icon: "nc-icon nc-chart-bar-32",
      component: Analytics,
      layout: "",
    },
    {
      path: "/theatres/homepage",
      name: "Theatre HomePage",
      icon: "nc-icon nc-shop",
      component: TheatreHomePage,
      layout: "",
    },
    {
      path: "/theatres/addmovie", // artist/:id to be done
      name: "Theatre- Add Movie",
      icon: "nc-icon nc-simple-add",
      component: AddMovieShowPage,
      layout: "",
    },
    {
      path: "/", // :movieid to be done
      name: "Select Role",
      icon: "nc-icon nc-lock-circle-open",
      component: MainPage,
      layout: "",
    },
  ];
} else if (role == "admin") {
  sidebar_display = [
    {
      path: "/admin/homepage", // :movieid to be done
      name: "Admin Homepage",
      icon: "nc-icon nc-shop",
      component: AdminHomePage,
      layout: "",
    },
    {
      path: "/admin/analytics",
      name: "Admin Analytics",
      icon: "nc-icon nc-chart-bar-32",
      component: TheatreLiveOnline,
      layout: "",
    },
    {
      path: "/", // :movieid to be done
      name: "Select Role",
      icon: "nc-icon nc-lock-circle-open",
      component: MainPage,
      layout: "",
    },
  ];
} else {
  sidebar_display = [
    {
      path: "/", // :movieid to be done
      name: "Select Role",
      icon: "nc-icon nc-lock-circle-open",
      component: MainPage,
      layout: "",
    },
  ];
}

export default routes;
export { sidebar_display };
