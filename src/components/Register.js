import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = register(formData.email, formData.password, formData.name);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="card">
          <div className="card-content">
            <h2 className="form-title">Join ReWear</h2>
            <p className="text-center mb-3">Create your account and start swapping clothes</p>

            {error && (
              <div className="error-message">
                <span className="material-icons">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="name">Full Name</label>
              </div>

              <div className="input">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="input">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="input">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-icons rotating">refresh</span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span className="material-icons">person_add</span>
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="form-footer">
              <p className="text-center">
                Already have an account?{' '}
                <Link to="/login" className="link">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="benefits">
              <h4>Why Join ReWear?</h4>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="material-icons">eco</span>
                  <p>Reduce textile waste and help the environment</p>
                </div>
                <div className="benefit-item">
                  <span className="material-icons">savings</span>
                  <p>Save money by swapping instead of buying new</p>
                </div>
                <div className="benefit-item">
                  <span className="material-icons">people</span>
                  <p>Join a community of sustainable fashion lovers</p>
                </div>
                <div className="benefit-item">
                  <span className="material-icons">style</span>
                  <p>Discover unique styles and vintage pieces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 