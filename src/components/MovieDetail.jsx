import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import movies from "../data/movies";
import cinemas from "../data/cinemas";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [showFull, setShowFull] = useState(false);

  if (!movie) {
    return <div style={{ padding: "2rem" }}>Film tidak ditemukan</div>;
  }

  const sentences = movie.sinopsis.split(".");
  const preview = sentences[0] + (sentences.length > 1 ? "." : "");
  const full = movie.sinopsis;

  const handleShowtimeClick = (cinema, time) => {
    // Simpan sesi film ke localStorage
    localStorage.setItem(
      "movieSession",
      JSON.stringify({
        cinemaId: cinema.id_cinemas,
        cinemaName: cinema.nama,
        date: cinema.tanggal,
        time: time,
        price: cinema.harga,
        seatCount: cinema.seatCount
      })
    );
    navigate(`/movie/${movie.id}/pilihKursi`);
  };

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-header">
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-detail-poster"
        />
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <p className="movie-sinopsis">
            {showFull ? full : preview}
            {sentences.length > 2 && (
              <span
                className="toggle-sinopsis"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Sembunyikan" : "Baca selengkapnya"}
              </span>
            )}
          </p>
          <p className="movie-duration">
            <span>🎬</span> {movie.durasi} Minutes
          </p>
          <div className="movie-tags">
            <span className="tag">{movie.dimensi}</span>
            <span className="tag">{movie.umur}</span>
          </div>
        </div>
      </div>

      <div className="movie-showtimes">
        {cinemas.map((cinema) => (
          <div className="cinema-card" key={cinema.id_cinemas}>
            <div className="cinema-header">
              <div>
                <h4>{cinema.nama}</h4>
                <span className="cinema-date">{cinema.tanggal}</span>
              </div>
              <span className="price">
                Rp. {cinema.harga.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="showtime-buttons">
              {cinema.times.map((time) => (
                <button
                  key={time}
                  onClick={() => handleShowtimeClick(cinema, time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;