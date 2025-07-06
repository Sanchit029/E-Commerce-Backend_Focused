import React from "react";

const CheckoutForm = ({ onClose }) => (
  <div className="card" style={{ maxWidth: 400, margin: "32px auto" }}>
    <h2>Checkout</h2>
    <form className="form">
      <input placeholder="Full Name" required />
      <input placeholder="Email" type="email" required />
      <input placeholder="Shipping Address" required />
      <input placeholder="City" required />
      <input placeholder="Postal Code" required />
      <input placeholder="Country" required />
      <button type="submit" disabled>Place Order (Demo)</button>
      <button type="button" onClick={onClose} style={{ marginTop: 8, background: '#aaa' }}>Cancel</button>
    </form>
  </div>
);

export default CheckoutForm;
