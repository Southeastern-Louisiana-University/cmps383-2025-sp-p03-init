import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheaterPage from "./TheaterPage/TheaterPage.tsx";
import ResponsiveAppBar from "./Components/NavBar.tsx";
import LoginPage from "./Login/LoginPage.tsx";
import TheaterPost from "./TheaterPage/TheaterPost.tsx";
import MovieDetail from "./MoviePage/MovieDetails.tsx";
import MovieFetch from "./MoviePage/MovieFetch.tsx";
import TheaterDetails from "./TheaterPage/TheaterDetails.tsx";
import SeatCount from "./Components/SeatCount.tsx";
import MovieCarousel from "./Components/MovieCarousel.tsx";
import PurchaseTicket from "./Components/PurchaseTicket.tsx";
import Dashboard from "./Dashboard.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <ResponsiveAppBar />

    <Routes>
      <Route path="/" element={<MovieCarousel />} />
      <Route path="/theaters/:id" element={<TheaterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/theaters/post" element={<TheaterPost />} />
      <Route path="/movies/fetch" element={<MovieFetch />} />
      <Route path="/theaters/admin" element={<TheaterDetails />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/seatcount/:id" element={<SeatCount />} />
      <Route path="/purchase/:id" element={<PurchaseTicket />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  </Router>
);
