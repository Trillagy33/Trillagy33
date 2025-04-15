// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo" onClick={() => navigate('/')}>
          <h1>Trillagy</h1>
        </div>
        <div className="nav-links">
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;