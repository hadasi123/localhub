// Business Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';

const BusinessPage = () => {
  const { items, loading, addItem } = useData('business');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    hours: '',
    services: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        name: '',
        description: '',
        category: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        hours: '',
        services: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding business:', error);
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
      title="עסקים ובעלי מקצוע בשכונה" 
    >
      <div className="fade-in">
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="mb-4"
          >
            {showForm ? 'Cancel' : 'Add Business'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add Local Business</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                      <option value="restaurant">Restaurant</option>
                      <option value="retail">Retail</option>
                      <option value="services">Services</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="automotive">Automotive</option>
                      <option value="beauty">Beauty & Wellness</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Hours</label>
                    <input
                      type="text"
                      name="hours"
                      value={formData.hours}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., Mon-Fri 9AM-6PM"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
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
                
                <div className="form-group">
                  <label className="form-label">Services</label>
                  <textarea
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder="List services offered"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">Add Business</Button>
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
          <h3 className="text-2xl font-semibold mb-6">Local Businesses</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>Loading businesses...</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">No businesses listed yet.</p>
                <p className="text-sm text-grey-500 mt-2">
                  Be the first to add a local business!
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {item.category}
                    </span>
                  </CardHeader>
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="space-y-1 text-sm text-grey-500">
                      {item.address && <p><strong>Address:</strong> {item.address}</p>}
                      {item.phone && <p><strong>Phone:</strong> {item.phone}</p>}
                      {item.email && <p><strong>Email:</strong> {item.email}</p>}
                      {item.website && <p><strong>Website:</strong> <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{item.website}</a></p>}
                      {item.hours && <p><strong>Hours:</strong> {item.hours}</p>}
                      {item.services && <p><strong>Services:</strong> {item.services}</p>}
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

export default BusinessPage;
