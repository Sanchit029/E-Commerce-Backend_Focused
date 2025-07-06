import React from "react";

const RegisterForm = ({ form, setForm, register }) => (
  <div className="card">
    <h2>Register</h2>
    <form onSubmit={register} className="form">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  </div>
);

export default RegisterForm;
