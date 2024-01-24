import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import Forgotpass from './pages/ForgotPass';
import Updatepss from './pages/UpdatePass';
import Blogs from './pages/Blogs';
import Product from './pages/Prod'; 
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
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/signin" element={<Signin setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpass/>} />
        <Route path="/updatepassword" element={<Updatepss />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route exact path="/blog/:id" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
