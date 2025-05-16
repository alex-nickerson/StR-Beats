import { useState } from 'react'
import BeatList from './BeatTech'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import AddBeat from './AddBeat';

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
  const [count, setCount] = useState(0)
  return (
  <Router>
  <nav>
    <div></div>
    <div className="logo">
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><img src="images/logo.png" alt="Logo" /></Link>
    </div>
    <div className="admin">
      <div>
      <Link to="/addbeat"><img src="images/plus-icon.png" alt="Add Beat" /></Link>
      </div>
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