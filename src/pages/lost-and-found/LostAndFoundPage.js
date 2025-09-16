// Lost and Found Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';

const LostAndFoundPage = () => {
  const { items, loading, addItem } = useData('lost-and-found');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    contact: '',
    type: 'lost'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        title: '',
        description: '',
        location: '',
        contact: '',
        type: 'lost'
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding item:', error);
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
      title="אבידות ומציאות" 
    >
      <div className="fade-in">
        {/* Add Item Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="mb-4"
          >
            {showForm ? 'Cancel' : 'Report Lost/Found Item'}
          </Button>
        </div>

        {/* Add Item Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Report Lost or Found Item</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="lost">Lost Item</option>
                      <option value="found">Found Item</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Brief description of the item"
                      required
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
                      placeholder="Where was it lost/found?"
                      required
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
                      placeholder="Your contact information"
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
                    placeholder="Detailed description of the item"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">Submit Report</Button>
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

        {/* Items List */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Recent Reports</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>Loading items...</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">No lost or found items reported yet.</p>
                <p className="text-sm text-grey-500 mt-2">
                  Be the first to report a lost or found item!
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.type === 'lost' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="text-sm text-grey-500 space-y-1">
                      <p><strong>Location:</strong> {item.location}</p>
                      <p><strong>Contact:</strong> {item.contact}</p>
                      <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
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

export default LostAndFoundPage;
