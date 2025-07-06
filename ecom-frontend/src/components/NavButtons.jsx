import React from "react";

const NavButtons = ({ view, setView }) => (
  <div className="nav-buttons">
    <button className={view === "login" ? "active" : ""} onClick={() => setView("login")}>Login</button>
    <button className={view === "register" ? "active" : ""} onClick={() => setView("register")}>Register</button>
  </div>
);

export default NavButtons;
