import {Link} from 'react-router-dom';

function Login() {
  return (
    <div>
      <nav>
        <div></div>
        <div>
          <Link to="/">
            <img src="images/logo.png" alt="StR Beats Logo" />
          </Link>
        </div>
        <div></div>
      </nav>

      <div className="container">
        <h1>Login</h1>
        <div className="login">
          <form action="">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="StR"
            />

            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="abc123"
            />

            <br />
            <input type="submit" value="submit" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;