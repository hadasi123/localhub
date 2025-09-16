// Education Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';

const EducationPage = () => {
  const { items, loading, addItem } = useData('education');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    instructor: '',
    contact: '',
    price: 0,
    schedule: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        title: '',
        description: '',
        category: '',
        level: '',
        duration: '',
        instructor: '',
        contact: '',
        price: 0,
        schedule: '',
        location: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding education item:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageLayout 
      title="חינוך ותרבות" 
      subtitle="הכל על מסגרות חינוכיות ותרבותיות בשכונת אריאל שרון"
    >
      <div className="fade-in">
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="mb-4"
          >
            {showForm ? 'Cancel' : 'Add Course/Workshop'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add Educational Opportunity</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="language">Language</option>
                      <option value="technology">Technology</option>
                      <option value="arts">Arts & Crafts</option>
                      <option value="fitness">Fitness</option>
                      <option value="cooking">Cooking</option>
                      <option value="business">Business</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., 8 weeks, 2 hours"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Instructor</label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price (₪)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Schedule</label>
                    <input
                      type="text"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., Mondays 7-9 PM"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">Add Course</Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <div>
          <h3 className="text-2xl font-semibold mb-6">Available Courses & Workshops</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>Loading courses...</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">No courses available yet.</p>
                <p className="text-sm text-grey-500 mt-2">
                  Be the first to add a course or workshop!
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-grey-500">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {item.level}
                      </span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="space-y-1 text-sm text-grey-500">
                      <p><strong>Instructor:</strong> {item.instructor}</p>
                      <p><strong>Duration:</strong> {item.duration}</p>
                      <p><strong>Schedule:</strong> {item.schedule}</p>
                      <p><strong>Location:</strong> {item.location}</p>
                      <p><strong>Price:</strong> ₪{item.price}</p>
                      <p><strong>Contact:</strong> {item.contact}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default EducationPage;
