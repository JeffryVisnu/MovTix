import "./PaymentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BuyTickets from "./BuyTickets";
import movies from "../data/movies";

function PaymentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Ambil data order dari localStorage
  const order = JSON.parse(localStorage.getItem("pendingOrder") || "{}");
  const movie = movies.find((m) => m.id === parseInt(id));

  const handlePayNow = async () => {
    if (selectedPayment) {
      // Kirim order ke backend
      const success = await BuyTickets(BASE_URL, order);
      if (success) {
        alert("Pembayaran berhasil dengan metode: " + selectedPayment);
        // Bersihkan order
        localStorage.removeItem("pendingOrder");
        navigate("/");
      } else {
        alert("Pembayaran gagal, silakan coba lagi.");
      }
    } else {
      alert("Pilih metode pembayaran terlebih dahulu.");
    }
  };

  // Format kursi
  const seatLabel = (s) =>
    String.fromCharCode(65 + Math.floor(s / 8)) + ((s % 8) + 1);

  return (
    <div className="payment-container">
      <div className="header">Ringkasan Order</div>
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
      <div className="section-title">Detail Transaksi</div>
      <div className="details-section ticket-style">
        <div className="details-left">
          <div className="details-row">
            <span className="details-label">
              {order.seat && order.seat.length} Tiket
            </span>
            <span className="details-value">
              {order.seat
                ? order.seat.map(seatLabel).join(", ")
                : "-"}
            </span>
          </div>
          <div className="details-row">
            <span className="details-label">Kursi Reguler</span>
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
      <div className="section-title">Metode Pembayaran</div>
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
        <div className="more-methods">Pilih Metode Pembayaran Lainnya &gt;</div>
      </div>

      {/* Promo/Voucher */}
      <div className="section-title">Promo/Voucher</div>
      <div className="promo-section">
        <p className="no-promo">
          Waduh! sayangnya lagi tidak ada voucher/promo untuk saat ini
        </p>
        <ul className="warnings">
          <li>Pembelian tiket tidak bisa dibatalkan/dirubah</li>
          <li>Untuk anak usia 2 tahun keatas wajib membeli tiket</li>
          <li>Tontonlah film sesuai kategori usia</li>
        </ul>
      </div>

      {/* Total Bayar */}
      <div className="total-section">
        <p>Total Bayar</p>
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
        SELESAIKAN PEMBAYARAN ANDA
      </button>
    </div>
  );
}

export default PaymentPage;