import "./PaymentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import movies from "../data/movies";

function PaymentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("");

  const order = JSON.parse(localStorage.getItem("pendingOrder") || "{}");
  const movie = movies.find((m) => m.id === parseInt(id));

    const handlePayNow = async () => {
    console.log("Payment button pressed"); 
    if (selectedPayment) {
      console.log("Selected payment method:", selectedPayment);
      const success = true;
      if (success) {
        alert("Payment successful using: " + selectedPayment);
        console.log("Navigating to confirmation page...");
        navigate(`/movie/${id}/orderSummary`);
      } else {
        alert("Payment failed, please try again.");
      }
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="payment-container">
      <div className="header">Transaction Detail</div>
      <div className="ticket-summary">
        <img
          src={order.poster || (movie && movie.poster)}
          alt="Poster"
          className="poster"
        />
        <div className="movie-info">
          <div className="title-row">
            <h3>{order.movieTitle || (movie && movie.title)}</h3>
            <span className="label">{order.umur || (movie && movie.umur)}</span>
          </div>
          <p className="cinema">{order.cinemaName || "-"}</p>
          <p className="datetime">
            {order.date || "-"}, {order.time || "-"}
          </p>
        </div>
      </div>

      {/* Detail Transaksi */}
      <div className="section-title">Seat Detail</div>
      <div className="details-section ticket-style">
        <div className="details-left">
          <div className="details-row">
            <span className="details-label">
              {order.seat && order.seat.length} Tickets
            </span>
              <span className="details-value">
              {order.seat ? order.seat.map((seat) => seat + 1).join(", ") : "-"}
            </span>
          </div>
          <div className="details-row">
            <span className="details-label">Regular Seat</span>
            <span className="details-value">
              {order.price && order.seat
                ? "Rp" +
                  (order.price * order.seat.length).toLocaleString("id-ID")
                : "-"}
            </span>
          </div>
          <div className="details-row">
            <span className="details-label">
              Admin
              <span className="admin-mult"> (Rp4.000 x {order.seat ? order.seat.length : 0})</span>
            </span>
            <span className="details-value">
              {order.seat
                ? "Rp" + (order.seat.length * 4000).toLocaleString("id-ID")
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Garis putus-putus */}
      <div className="ticket-divider"></div>

      {/* Metode Pembayaran */}
      <div className="section-title">Payment Methods</div>
      <div className="payment-methods">
        <label className="payment-radio">
          <input
            type="radio"
            name="payment"
            value="GoPay"
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <span className="radio-label">GoPay</span>
          <span className="radio-dot" />
        </label>
        <label className="payment-radio">
          <input
            type="radio"
            name="payment"
            value="Dana"
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <span className="radio-label">Dana</span>
          <span className="radio-dot" />
        </label>
        <label className="payment-radio">
          <input
            type="radio"
            name="payment"
            value="ShopeePay"
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <span className="radio-label">ShopeePay</span>
          <span className="radio-dot" />
        </label>
        <div className="more-methods">Choose Another Payment Methods --&gt;</div>
      </div>

      {/* Promo/Voucher */}
      <div className="section-title">Promos/Vouchers</div>
      <div className="promo-section">
        <p className="no-promo">
          Oops! Unfortunately, there are no vouchers or promos available at the moment.
        </p>
        <ul className="warnings">
          <li>Tickets cannot be canceled or changed.</li>
          <li>Children aged 2 and above are required to purchase a ticket.</li>
          <li>Please watch movies according to the age rating.</li>
        </ul>
      </div>

      {/* Total Bayar */}
      <div className="total-section">
        <p>Total</p>
        <p>
          Rp
          {order.total
            ? (
                order.total +
                (order.seat ? order.seat.length * 4000 : 0)
              ).toLocaleString("id-ID")
            : "0"}
        </p>
      </div>

      <button className="pay-button" onClick={handlePayNow}>
        COMPLETE YOUR PAYMENT
      </button>
    </div>
  );
}

export default PaymentPage;