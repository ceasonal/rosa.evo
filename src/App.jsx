import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Navbar from './components/navbar';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <Router>
      <Navbar token={token} /> {/* pass the token state as a prop to the Navbar component */}
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/signin" element={<Signin setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route exact path="/blog/:id" element={<Blogs />} />
        <Route path="/contact" element={<Contact token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
