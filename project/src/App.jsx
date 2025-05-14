import { useState } from 'react'
import BeatList from './BeatTech'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from 'Login';
import AddBeat from 'AddBeat';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Router>
  <nav>
    <div></div>
    <div className="logo"><a href=""><img src="images/logo.png" alt=""></img></a></div>
    <div className="admin">
      <div>
      <a href="../login.html"><img src="images/tag-icon.png" alt=""></img></a>
      </div>
      <div>
      <a href="../addbeat.html"><img src="images/download-button.png" alt=""></img></a>
      </div>
    </div>
  </nav>
  </Router>

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
  )
}

export default App
