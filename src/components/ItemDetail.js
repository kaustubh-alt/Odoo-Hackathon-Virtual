import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockItems } from '../data/mockData';

const ItemDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');

  const item = mockItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className="item-detail-page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">
              <span className="material-icons">error</span>
            </div>
            <h4>Item not found</h4>
            <p>The item you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary" onClick={() => navigate('/browse')}>
              Browse Items
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isOwnItem = currentUser && item.uploaderId === currentUser.id;

  const handleSwapRequest = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const handleRedeemWithPoints = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.points < item.pointsValue) {
      alert('You don\'t have enough points to redeem this item.');
      return;
    }
    
    // In a real app, you'd make an API call here
    alert(`Item redeemed for ${item.pointsValue} points!`);
    navigate('/dashboard');
  };

  const submitSwapRequest = () => {
    if (!swapMessage.trim()) {
      alert('Please enter a message for your swap request.');
      return;
    }
    
    // In a real app, you'd make an API call here
    alert('Swap request sent! The owner will be notified.');
    setShowSwapModal(false);
    setSwapMessage('');
    navigate('/dashboard');
  };

  return (
    <div className="item-detail-page">
      <div className="container">
        <div className="item-detail">
          {/* Image Gallery */}
          <div className="item-gallery">
            <div className="main-image">
              <img src={item.images[currentImage]} alt={item.title} />
              {item.images.length > 1 && (
                <>
                  <button 
                    className="gallery-nav prev"
                    onClick={() => setCurrentImage(prev => prev === 0 ? item.images.length - 1 : prev - 1)}
                  >
                    <span className="material-icons">chevron_left</span>
                  </button>
                  <button 
                    className="gallery-nav next"
                    onClick={() => setCurrentImage(prev => (prev + 1) % item.images.length)}
                  >
                    <span className="material-icons">chevron_right</span>
                  </button>
                </>
              )}
            </div>
            
            {item.images.length > 1 && (
              <div className="image-thumbnails">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentImage ? 'active' : ''}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img src={image} alt={`${item.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Info */}
          <div className="item-info">
            <div className="item-header">
              <h1>{item.title}</h1>
              <div className="points-value">{item.pointsValue} points</div>
            </div>

            <div className="item-description">
              <p>{item.description}</p>
            </div>

            <div className="item-details">
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{item.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{item.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Size:</span>
                <span className="detail-value">{item.size}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Condition:</span>
                <span className="detail-value">{item.condition.replace('_', ' ')}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{item.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Listed:</span>
                <span className="detail-value">{new Date(item.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="item-tags">
              {item.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* Uploader Info */}
            <div className="uploader-info">
              <div className="uploader-header">
                <img src={item.uploaderAvatar} alt={item.uploaderName} className="uploader-avatar" />
                <div className="uploader-details">
                  <h3>{item.uploaderName}</h3>
                  <p>Member since {new Date('2024-01-01').toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwnItem && (
              <div className="item-actions">
                <button className="btn btn-primary" onClick={handleSwapRequest}>
                  <span className="material-icons">swap_horiz</span>
                  Request Swap
                </button>
                <button className="btn btn-secondary" onClick={handleRedeemWithPoints}>
                  <span className="material-icons">redeem</span>
                  Redeem with Points
                </button>
              </div>
            )}

            {isOwnItem && (
              <div className="item-actions">
                <button className="btn btn-outlined" onClick={() => navigate('/dashboard')}>
                  <span className="material-icons">edit</span>
                  Edit Item
                </button>
                <button className="btn btn-secondary">
                  <span className="material-icons">delete</span>
                  Remove Item
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Swap Request Modal */}
        {showSwapModal && (
          <div className="modal-overlay" onClick={() => setShowSwapModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Request Swap</h3>
                <button className="modal-close" onClick={() => setShowSwapModal(false)}>
                  <span className="material-icons">close</span>
                </button>
              </div>
              <div className="modal-content">
                <p>Send a message to {item.uploaderName} about your swap request for "{item.title}".</p>
                <div className="input">
                  <textarea
                    value={swapMessage}
                    onChange={(e) => setSwapMessage(e.target.value)}
                    placeholder="Tell them why you'd like to swap for this item..."
                    rows={4}
                    required
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-outlined" onClick={() => setShowSwapModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={submitSwapRequest}>
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail; 