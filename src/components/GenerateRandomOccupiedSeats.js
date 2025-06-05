function generateRandomOccupiedSeats(min, max, seatCount) {
  // min & max: jumlah kursi yang ingin diisi (misal 0-5)
  // seatCount: total kursi (misal 64)
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const seats = new Set();
  while (seats.size < count) {
    seats.add(Math.floor(Math.random() * seatCount));
  }
  return Array.from(seats);
}
export default generateRandomOccupiedSeats;