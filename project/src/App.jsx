import { useState, useEffect } from 'react'
import BeatList from './BeatTech'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import AddBeat from './AddBeat';
import { supabase } from './supabaseClient'


function Home() {
  return (
    <>
      <section>
        <div className="hero" id="hero">
          <BeatList />
        </div>
      </section>
      <footer>
        <div>I am not a mixing engineer nor a professional.</div>
        <div>Contact me: nickersonaj1@gmail.com</div>
        <div>All beats are free for use!</div>
      </footer>
    </>
  );
}

function App() {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
  <Router>
  <nav>
    <div></div>
    <div className="logo">
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><img src="images/logo.png" alt="Logo" /></Link>
    </div>
    <div className="admin">
      {session ? (
      <div>
      <Link to="/addbeat"><img src="images/plus-icon.png" alt="Add Beat" /></Link>
      </div>
      ) : null}
      <div>
      <Link to="/login"><img src="images/profile-icon.png" alt="Login" /></Link>
      </div>
    </div>
  </nav>

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/addbeat" element={<AddBeat />} />
  </Routes>
  </Router>
  );
}

export default App