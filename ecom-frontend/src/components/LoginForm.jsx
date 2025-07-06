

const LoginForm = ({ loginForm, setLoginForm, login }) => (
  <div className="card">
    <h2>Login</h2>
    <form onSubmit={login} className="form">
      <input
        placeholder="Email"
        value={loginForm.email}
        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={loginForm.password}
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  </div>
);

export default LoginForm;
