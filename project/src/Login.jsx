import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Authenticates the user signing in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
      });
      if (signInError) {
        console.error("Error signing up:", signInError.message);
        window.alert("Email or password incorrect.");
        return;
      }
      else {
        window.alert("Sign in successful!")
      }
    }

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <input type="submit" value="submit" className="submit" />
          </form>
        </div>
        Signup coming soon!
      </div>
    </div>
  );
};

export default Login;