import React, { useState } from 'react';
import { mockItems, mockUsers, mockSwaps } from '../data/mockData';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingItems, setPendingItems] = useState(
    mockItems.filter(item => item.status === 'pending_approval')
  );

  const totalUsers = mockUsers.length;
  const totalItems = mockItems.length;
  const totalSwaps = mockSwaps.length;
  const pendingCount = pendingItems.length;

  const handleApproveItem = (itemId) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    // In a real app, you'd update the item status in the database
    alert('Item approved successfully!');
  };

  const handleRejectItem = (itemId) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    // In a real app, you'd update the item status in the database
    alert('Item rejected and removed.');
  };

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
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Manage the ReWear platform and moderate content</p>
        </div>

        <div className="admin-overview">
          {/* Stats Overview */}
          <div className="admin-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">people</span>
              </div>
              <div className="stat-info">
                <div className="stat-number">{totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">inventory</span>
              </div>
              <div className="stat-info">
                <div className="stat-number">{totalItems}</div>
                <div className="stat-label">Total Items</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">swap_horiz</span>
              </div>
              <div className="stat-info">
                <div className="stat-number">{totalSwaps}</div>
                <div className="stat-label">Total Swaps</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="material-icons">pending</span>
              </div>
              <div className="stat-info">
                <div className="stat-number">{pendingCount}</div>
                <div className="stat-label">Pending Items</div>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="admin-actions-card">
            <h3>Quick Actions</h3>
            <div className="admin-actions">
              <button className="btn btn-primary">
                <span className="material-icons">download</span>
                Export Data
              </button>
              <button className="btn btn-outlined">
                <span className="material-icons">notifications</span>
                Send Announcement
              </button>
              <button className="btn btn-secondary">
                <span className="material-icons">security</span>
                Security Settings
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="material-icons">dashboard</span>
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            <span className="material-icons">pending</span>
            Pending Items ({pendingCount})
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="material-icons">people</span>
            Users
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
        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="admin-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {mockSwaps.slice(0, 5).map(swap => (
                    <div key={swap.id} className="activity-item">
                      <div className="activity-icon">
                        <span className="material-icons">
                          {swap.status === 'completed' ? 'check_circle' : 'swap_horiz'}
                        </span>
                      </div>
                      <div className="activity-content">
                        <p>
                          <strong>{swap.requesterName}</strong> requested <strong>{swap.itemTitle}</strong>
                        </p>
                        <span className={`status-badge ${getStatusBadgeClass(swap.status)}`}>
                          {swap.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="pending-content">
              <div className="admin-card">
                <h3>Items Pending Approval</h3>
                {pendingItems.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <span className="material-icons">check_circle</span>
                    </div>
                    <h4>No pending items</h4>
                    <p>All items have been reviewed!</p>
                  </div>
                ) : (
                  <div className="pending-items">
                    {pendingItems.map(item => (
                      <div key={item.id} className="pending-item">
                        <div className="item-thumbnail">
                          <img src={item.images[0]} alt={item.title} />
                        </div>
                        <div className="item-info">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                          <div className="item-meta">
                            <span>By: {item.uploaderName}</span>
                            <span>{item.pointsValue} points</span>
                            <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="item-actions">
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleApproveItem(item.id)}
                          >
                            <span className="material-icons">check</span>
                            Approve
                          </button>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => handleRejectItem(item.id)}
                          >
                            <span className="material-icons">close</span>
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-content">
              <div className="admin-card">
                <h3>User Management</h3>
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Points</th>
                        <th>Items</th>
                        <th>Swaps</th>
                        <th>Join Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map(user => (
                        <tr key={user.id}>
                          <td className="user-cell">
                            <img src={user.avatar} alt={user.name} className="user-avatar" />
                            <span>{user.name}</span>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{user.points}</td>
                          <td>{user.itemsCount}</td>
                          <td>{user.swapsCompleted}</td>
                          <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'swaps' && (
            <div className="swaps-content">
              <div className="admin-card">
                <h3>Swap Management</h3>
                <div className="swaps-list">
                  {mockSwaps.map(swap => (
                    <div key={swap.id} className="swap-item">
                      <div className="swap-info">
                        <div className="swap-parties">
                          <div className="party">
                            <img src={swap.requesterAvatar} alt={swap.requesterName} className="party-avatar" />
                            <span>{swap.requesterName}</span>
                          </div>
                          <span className="material-icons">swap_horiz</span>
                          <div className="party">
                            <img src={swap.ownerAvatar} alt={swap.ownerName} className="party-avatar" />
                            <span>{swap.ownerName}</span>
                          </div>
                        </div>
                        <div className="swap-details">
                          <h4>{swap.itemTitle}</h4>
                          <span className="swap-date">{swap.requestDate}</span>
                        </div>
                      </div>
                      <div className="swap-actions">
                        <span className={`status-badge ${getStatusBadgeClass(swap.status)}`}>
                          {swap.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 