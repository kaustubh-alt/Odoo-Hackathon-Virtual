import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="material-icons">eco</span>
            <span>ReWear</span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/browse" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Browse Items
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/add-item" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  List an Item
                </Link>
                <Link to="/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <div className="navbar-user">
                  <div className="user-info">
                    <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
                    <span className="user-name">{currentUser.name}</span>
                    <span className="user-points">{currentUser.points} pts</span>
                  </div>
                  <button className="btn btn-text" onClick={handleLogout}>
                    <span className="material-icons">logout</span>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-outlined">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button 
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 