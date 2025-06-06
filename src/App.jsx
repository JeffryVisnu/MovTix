import "./App.css";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieSection from "./components/MovieSection";
import MovieDetail from "./components/MovieDetail";
import movies from "./data/movies";
import SeatPlan from "./components/seatPlan";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/confirmationPage";

function SeatPlanWrapper() {
  const { id } = useParams();
  const movieId = parseInt(id);
  const movie = movies.find((m) => m.id === movieId);

  if (!id || isNaN(movieId)) return <div>Invalid movie ID</div>;
  if (!movie) return <div>Movie not found</div>;

  return <SeatPlan movie={movie} />;
}

function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (e) {
    return <div style={{ color: "red" }}>Error: {e.message}</div>;
  }
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {console.log("RENDER HOME ROUTE")}
              <ErrorBoundary>
                <main>
                  <Hero />
                  <MovieSection title="Now Playing" movies={movies} />
                </main>
              </ErrorBoundary>
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/selectSeat" element={<SeatPlanWrapper key={window.location.pathname} />} />
        <Route path="/movie/:id/payment" element={<PaymentPage />} />
        <Route path="/movie/:id/orderSummary" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;