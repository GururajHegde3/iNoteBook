import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../Stylesheets/Nav.css"

function Nav() {
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong style={{ color: '#007bff' }}>iNoteBook</strong>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? (
              <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-2" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-outline-primary" to="/signup" role="button">
                  Sign Up
                </Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
