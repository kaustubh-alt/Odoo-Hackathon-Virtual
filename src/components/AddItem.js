import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { categories, types, sizes, conditions } from '../data/mockData';

const AddItem = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    pointsValue: '',
    location: '',
    tags: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.category) {
      setError('Category is required');
      return;
    }
    if (!formData.type) {
      setError('Type is required');
      return;
    }
    if (!formData.size) {
      setError('Size is required');
      return;
    }
    if (!formData.condition) {
      setError('Condition is required');
      return;
    }
    if (!formData.pointsValue || formData.pointsValue < 1) {
      setError('Points value must be at least 1');
      return;
    }
    if (images.length === 0) {
      setError('At least one image is required');
      return;
    }

    setLoading(true);

    try {
      // In a real app, you'd upload images to a server and get URLs
      // For now, we'll simulate the process
      const newItem = {
        id: Date.now().toString(),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: images, // In real app, these would be uploaded URLs
        uploaderId: currentUser.id,
        uploaderName: currentUser.name,
        uploaderAvatar: currentUser.avatar,
        status: 'pending_approval',
        uploadDate: new Date().toISOString().split('T')[0]
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Item submitted successfully! It will be reviewed by our team.');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to submit item. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="add-item-page">
      <div className="container">
        <div className="add-item-header">
          <h1>List a New Item</h1>
          <p>Share your traditional Indian clothing with the community</p>
        </div>

        <div className="form-container">
          <div className="form-card">
            {error && (
              <div className="error-message">
                <span className="material-icons">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Images Upload */}
              <div className="form-section">
                <label className="section-label">Images</label>
                <div className="image-upload-area">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">
                      <span className="material-icons">add_photo_alternate</span>
                    </div>
                    <h4>Upload Images</h4>
                    <p>Click to upload images of your item</p>
                    <span className="upload-hint">Upload up to 5 images (JPG, PNG)</span>
                  </label>
                </div>
                
                {images.length > 0 && (
                  <div className="uploaded-images">
                    {images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-image"
                          onClick={() => removeImage(index)}
                        >
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="form-section">
                <label className="section-label">Basic Information</label>
                
                <div className="form-row">
                  <div className="input">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="title">Item Title</label>
                  </div>

                  <div className="input">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder=" "
                    />
                    <label htmlFor="location">Location</label>
                  </div>
                </div>

                <div className="input">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder=" "
                    rows={4}
                    required
                  />
                  <label htmlFor="description">Description</label>
                </div>

                <div className="input">
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label htmlFor="tags">Tags (comma-separated)</label>
                </div>
              </div>

              {/* Item Details */}
              <div className="form-section">
                <label className="section-label">Item Details</label>
                
                <div className="form-row">
                  <div className="input">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="category">Category</label>
                  </div>

                  <div className="input">
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      {types.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="type">Type</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input">
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Size</option>
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <label htmlFor="size">Size</label>
                  </div>

                  <div className="input">
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Condition</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>
                          {condition.replace('_', ' ').charAt(0).toUpperCase() + condition.replace('_', ' ').slice(1)}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="condition">Condition</label>
                  </div>
                </div>

                <div className="input">
                  <input
                    type="number"
                    id="pointsValue"
                    name="pointsValue"
                    value={formData.pointsValue}
                    onChange={handleChange}
                    placeholder=" "
                    min="1"
                    required
                  />
                  <label htmlFor="pointsValue">Points Value</label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outlined"
                  onClick={() => navigate('/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-icons rotating">refresh</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="material-icons">add</span>
                      List Item
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem; 