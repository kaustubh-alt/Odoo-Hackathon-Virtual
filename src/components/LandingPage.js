import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { featuredItems } from '../data/mockData';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>ReWear</h1>
            <p>Join the sustainable fashion revolution. Exchange traditional Indian clothing, reduce waste, and build community.</p>
            <div className="hero-actions">
              <Link to="/browse" className="btn btn-primary">
                <span className="material-icons">search</span>
                Browse Items
              </Link>
              <Link to="/register" className="btn btn-outlined">
                <span className="material-icons">person_add</span>
                Start Swapping
              </Link>
              <Link to="/add-item" className="btn btn-secondary">
                <span className="material-icons">add</span>
                List an Item
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop" alt="Sustainable Fashion" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Items</h2>
          
          <div className="featured-grid">
            {featuredItems.slice(0, 3).map((item) => (
              <div key={item.id} className="featured-card">
                <div className="featured-image">
                  <img src={item.images[0]} alt={item.title} />
                  <div className="featured-overlay">
                    <Link to={`/item/${item.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="featured-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="featured-meta">
                    <span className="featured-points">{item.pointsValue} points</span>
                    <span className="featured-location">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <span className="material-icons step-icon">upload</span>
                <h3>List Your Items</h3>
                <p>Upload photos and details of traditional Indian clothing you no longer wear. Set your points value or choose to swap directly.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <span className="material-icons step-icon">swap_horiz</span>
                <h3>Find & Swap</h3>
                <p>Browse traditional Indian clothing from other community members. Request swaps or redeem items using your points.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <span className="material-icons step-icon">eco</span>
                <h3>Save the Planet</h3>
                <p>Every swap reduces textile waste and promotes sustainable Indian fashion. Join thousands making a difference.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">swap_horiz</span>
              </div>
              <div className="stat-number">1,234</div>
              <div className="stat-label">Items Swapped</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">people</span>
              </div>
              <div className="stat-number">567</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">location_city</span>
              </div>
              <div className="stat-number">89</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">eco</span>
              </div>
              <div className="stat-number">2.3k</div>
              <div className="stat-label">Pounds of Waste Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to Start Swapping?</h2>
              <p>Join our community and start your sustainable fashion journey today.</p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary">
                  <span className="material-icons">person_add</span>
                  Sign Up Now
                </Link>
                <Link to="/browse" className="btn btn-outlined">
                  <span className="material-icons">explore</span>
                  Explore Items
                </Link>
              </div>
            </div>
            <div className="cta-visual">
              <img src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop" alt="Join Community" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 