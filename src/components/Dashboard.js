import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockItems, mockSwaps } from '../data/mockData';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Filter items and swaps for current user
  const userItems = mockItems.filter(item => item.uploaderId === currentUser.id);
  const userSwaps = mockSwaps.filter(swap => 
    swap.requesterId === currentUser.id || swap.ownerId === currentUser.id
  );

  const pendingSwaps = userSwaps.filter(swap => swap.status === 'pending');
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed');

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {currentUser.name}!</p>
        </div>

        <div className="dashboard-layout">
          {/* Sidebar */}
          <div className="dashboard-sidebar">
            <div className="profile-card">
              <div className="profile-header">
                <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
                <div className="profile-info">
                  <h3>{currentUser.name}</h3>
                  <p className="profile-email">{currentUser.email}</p>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <span className="material-icons">stars</span>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{currentUser.points}</span>
                    <span className="stat-label">Points</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <span className="material-icons">inventory</span>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{currentUser.itemsCount}</span>
                    <span className="stat-label">Items Listed</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <span className="material-icons">swap_horiz</span>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{currentUser.swapsCompleted}</span>
                    <span className="stat-label">Swaps Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <Link to="/add-item" className="btn btn-primary">
                <span className="material-icons">add</span>
                List New Item
              </Link>
              <Link to="/browse" className="btn btn-outlined">
                <span className="material-icons">search</span>
                Browse Items
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-main">
            {/* Tab Navigation */}
            <div className="dashboard-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="material-icons">dashboard</span>
                Overview
              </button>
              <button 
                className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
                onClick={() => setActiveTab('items')}
              >
                <span className="material-icons">inventory</span>
                My Items
              </button>
              <button 
                className={`tab-button ${activeTab === 'swaps' ? 'active' : ''}`}
                onClick={() => setActiveTab('swaps')}
              >
                <span className="material-icons">swap_horiz</span>
                Swaps
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <div className="overview-stats">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <span className="material-icons">inventory</span>
                      </div>
                      <div className="stat-info">
                        <span className="stat-number">{userItems.length}</span>
                        <span className="stat-label">Items Listed</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <span className="material-icons">pending</span>
                      </div>
                      <div className="stat-info">
                        <span className="stat-number">{pendingSwaps.length}</span>
                        <span className="stat-label">Pending Swaps</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <span className="material-icons">check_circle</span>
                      </div>
                      <div className="stat-info">
                        <span className="stat-number">{completedSwaps.length}</span>
                        <span className="stat-label">Completed Swaps</span>
                      </div>
                    </div>
                  </div>

                  <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    {userSwaps.slice(0, 3).map(swap => (
                      <div key={swap.id} className="activity-item">
                        <div className="activity-icon">
                          <span className="material-icons">
                            {swap.status === 'completed' ? 'check_circle' : 
                             swap.status === 'pending' ? 'pending' : 'swap_horiz'}
                          </span>
                        </div>
                        <div className="activity-content">
                          <p>
                            {swap.requesterId === currentUser.id ? 'You requested' : 'You received a request for'}{' '}
                            <strong>{swap.itemTitle}</strong>
                          </p>
                          <span className={`status-badge ${getStatusBadgeClass(swap.status)}`}>
                            {swap.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'items' && (
                <div className="items-tab">
                  <div className="tab-header">
                    <h3>My Listed Items</h3>
                    <Link to="/add-item" className="btn btn-primary">
                      <span className="material-icons">add</span>
                      Add Item
                    </Link>
                  </div>
                  
                  {userItems.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <span className="material-icons">inventory_2</span>
                      </div>
                      <h4>No items listed yet</h4>
                      <p>Start by listing your first item for swap!</p>
                      <Link to="/add-item" className="btn btn-primary">
                        List Your First Item
                      </Link>
                    </div>
                  ) : (
                    <div className="items-grid">
                      {userItems.map(item => (
                        <div key={item.id} className="item-card">
                          <div className="item-image">
                            <img src={item.images[0]} alt={item.title} />
                            <div className="item-overlay">
                              <Link to={`/item/${item.id}`} className="btn btn-primary">
                                View Details
                              </Link>
                            </div>
                          </div>
                          <div className="item-content">
                            <h4 className="item-title">{item.title}</h4>
                            <p className="item-description">{item.description}</p>
                            <div className="item-meta">
                              <div className="item-details">
                                <span className="item-size">{item.size}</span>
                                <span className="item-condition">{item.condition.replace('_', ' ')}</span>
                              </div>
                              <div className="item-points">{item.pointsValue} points</div>
                            </div>
                            <div className="item-footer">
                              <span className={`status-badge ${item.status === 'available' ? 'status-accepted' : 'status-pending'}`}>
                                {item.status}
                              </span>
                              <Link to={`/item/${item.id}`} className="btn btn-outlined">
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'swaps' && (
                <div className="swaps-tab">
                  <div className="tab-header">
                    <h3>My Swaps</h3>
                  </div>
                  
                  {userSwaps.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <span className="material-icons">swap_horiz</span>
                      </div>
                      <h4>No swaps yet</h4>
                      <p>Start browsing items to make your first swap!</p>
                      <Link to="/browse" className="btn btn-primary">
                        Browse Items
                      </Link>
                    </div>
                  ) : (
                    <div className="swaps-list">
                      {userSwaps.map(swap => (
                        <div key={swap.id} className="swap-card">
                          <div className="swap-item-image">
                            <img src={swap.itemImage} alt={swap.itemTitle} />
                          </div>
                          <div className="swap-content">
                            <h4>{swap.itemTitle}</h4>
                            <p>
                              {swap.requesterId === currentUser.id ? 'You requested this item' : 'Someone requested your item'}
                            </p>
                            <div className="swap-meta">
                              <span className="swap-date">{swap.requestDate}</span>
                              <span className={`status-badge ${getStatusBadgeClass(swap.status)}`}>
                                {swap.status}
                              </span>
                            </div>
                            <div className="swap-message">
                              <strong>Message:</strong> {swap.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 