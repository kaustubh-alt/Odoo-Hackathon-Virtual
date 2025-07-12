import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    setLoading(true);

    try {
      const result = login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="card">
          <div className="card-content">
            <h2 className="form-title">Welcome Back</h2>
            <p className="text-center mb-3">Sign in to your ReWear account</p>

            {error && (
              <div className="error-message">
                <span className="material-icons">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-icons rotating">refresh</span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span className="material-icons">login</span>
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="form-footer">
              <p className="text-center">
                Don't have an account?{' '}
                <Link to="/register" className="link">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="demo-accounts">
              <h4>Demo Accounts</h4>
              <div className="demo-grid">
                <div className="demo-account">
                  <strong>Regular Users:</strong>
                  <p>priya@example.com</p>
                  <p>anjali@example.com</p>
                </div>
                <div className="demo-account">
                  <strong>Admin:</strong>
                  <p>admin@rewear.com</p>
                </div>
              </div>
              <p className="demo-note">Use any password to login with demo accounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 