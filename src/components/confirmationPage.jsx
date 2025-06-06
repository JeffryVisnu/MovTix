import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./confirmationPage.css";

function ConfirmationPage() {
  const { id } = useParams();
  console.log("Movie ID:", id);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [bookingCode, setBookingCode] = useState("");

  useEffect(() => {
    // Ambil data dari localStorage
    const savedOrder = JSON.parse(localStorage.getItem("pendingOrder") || "{}");
    console.log("Saved order:", savedOrder); // Debugging log
    setOrder(savedOrder);

    // Ambil kode booking dari localStorage atau buat baru jika belum ada
    const savedBookingCode = localStorage.getItem("bookingCode");
    if (savedBookingCode) {
      setBookingCode(savedBookingCode);
    } else {
      const newBookingCode = generateBookingCode();
      setBookingCode(newBookingCode);
      localStorage.setItem("bookingCode", newBookingCode);
    }
  }, []);

  const generateBookingCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  return (
    <div className="confirmation-container">
      <div className="header">Booking Summary</div>
      <div className="ticket-summary">
        {order.poster ? (
          <img src={order.poster} alt="Poster" className="poster" />
        ) : null}
          <div className="movie-info">
          <div className="title-row">
            <h3>{order.movieTitle || "Movie Title Not Found"}</h3>
            <span className="label">{order.umur || "N/A"}</span>
          </div>
          <p className="cinema">{order.cinemaName || "Cinema Name Not Found"}</p>
          <p className="datetime">
            {order.date || "Date Not Found"}, {order.time || "Time Not Found"}
          </p>
          <p>Selected Seat(s):</p>
          <div className="seat-grid">
            {order.seat && order.seat.length > 0
              ? order.seat.map((seat) => (
                  <div key={seat} className="seat-box">{seat + 1}</div>
                ))
              : "No Seats Selected"}
          </div>
        </div>
      </div>
      <div className="booking-code">
        <p>Booking Code:</p>
        <h2>{bookingCode}</h2>
      </div>
      <button
        className="back-button"
        onClick={() => {
          localStorage.removeItem("pendingOrder");
          localStorage.removeItem("bookingCode");
          navigate("/");
        }}
      >
          Back to Home
      </button>
    </div>
  );
}

export default ConfirmationPage;  