import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockItems } from '../data/mockData';
import { ITEM_CATEGORIES, ITEM_TYPES, ITEM_SIZES, ITEM_CONDITIONS } from '../types';

const BrowseItems = () => {
  const [items, setItems] = useState(mockItems);
  const [filteredItems, setFilteredItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let filtered = items;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Size filter
    if (selectedSize) {
      filtered = filtered.filter(item => item.size === selectedSize);
    }

    // Condition filter
    if (selectedCondition) {
      filtered = filtered.filter(item => item.condition === selectedCondition);
    }

    // Sort items
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        break;
      case 'points-low':
        filtered.sort((a, b) => a.pointsValue - b.pointsValue);
        break;
      case 'points-high':
        filtered.sort((a, b) => b.pointsValue - a.pointsValue);
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, selectedType, selectedSize, selectedCondition, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedType('');
    setSelectedSize('');
    setSelectedCondition('');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedType || selectedSize || selectedCondition;

  return (
    <div className="browse-page">
      <div className="container">
        <div className="browse-header">
          <h1>Browse Items</h1>
          <p>Discover amazing clothing items from our community</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            {/* Search */}
            <div className="filter-group">
              <label>Search</label>
              <div className="search-input">
                <span className="material-icons">search</span>
                <input
                  type="text"
                  placeholder="Search items, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {Object.entries(ITEM_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="filter-group">
              <label>Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {Object.entries(ITEM_TYPES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div className="filter-group">
              <label>Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">All Sizes</option>
                {Object.entries(ITEM_SIZES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div className="filter-group">
              <label>Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <option value="">All Conditions</option>
                {Object.entries(ITEM_CONDITIONS).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.replace('_', ' ').charAt(0).toUpperCase() + value.replace('_', ' ').slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="points-low">Points: Low to High</option>
                <option value="points-high">Points: High to Low</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="filter-actions">
              <button className="btn btn-outlined" onClick={clearFilters}>
                <span className="material-icons">clear</span>
                Clear Filters
              </button>
              <span className="results-count">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              </span>
            </div>
          )}
        </div>

        {/* Items Grid */}
        <div className="items-section">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <span className="material-icons">search_off</span>
              </div>
              <h4>No items found</h4>
              <p>Try adjusting your filters or search terms</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="items-grid">
              {filteredItems.map(item => (
                <Link to={`/item/${item.id}`} key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.images[0]} alt={item.title} />
                    <div className="item-overlay">
                      <span className="material-icons">visibility</span>
                    </div>
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h3>{item.title}</h3>
                      <div className="points-badge">{item.pointsValue} points</div>
                    </div>
                    <p className="item-description">{item.description}</p>
                    <div className="item-meta">
                      <span className="item-category">{item.category}</span>
                      <span className="item-size">{item.size}</span>
                    </div>
                    <div className="item-tags">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="tag">+{item.tags.length - 3}</span>
                      )}
                    </div>
                    <div className="item-footer">
                      <div className="uploader-info">
                        <img src={item.uploaderAvatar} alt={item.uploaderName} />
                        <span>{item.uploaderName}</span>
                      </div>
                      <span className="upload-date">
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseItems; 