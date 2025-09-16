// Carpool Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';

const CarpoolPage = () => {
  const { items, loading, addItem } = useData('carpool');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: 0,
    driver: '',
    contact: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        from: '',
        to: '',
        date: '',
        time: '',
        seats: 1,
        price: 0,
        driver: '',
        contact: '',
        description: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding carpool:', error);
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
      title="קארפול" 
      subtitle="נסיעות שיתופיות אל ומחוץ לשכונה"
    >
      <div className="fade-in">
        {/* Add Carpool Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="mb-4"
          >
            {showForm ? 'Cancel' : 'Offer/Request Ride'}
          </Button>
        </div>

        {/* Add Carpool Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Offer or Request a Ride</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">From</label>
                    <input
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Starting location"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">To</label>
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Destination"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Available Seats</label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleInputChange}
                      className="form-input"
                      min="1"
                      max="8"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price per Person (₪)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Driver Name</label>
                    <input
                      type="text"
                      name="driver"
                      value={formData.driver}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your name"
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
                      placeholder="Phone or email"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder="Any additional information about the ride"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">Submit Ride</Button>
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

        {/* Carpool List */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Available Rides</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>Loading rides...</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">No carpool rides available yet.</p>
                <p className="text-sm text-grey-500 mt-2">
                  Be the first to offer a ride!
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {item.from} → {item.to}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2 mb-4">
                      <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {item.time}</p>
                      <p><strong>Seats:</strong> {item.seats}</p>
                      <p><strong>Price:</strong> ₪{item.price}</p>
                      <p><strong>Driver:</strong> {item.driver}</p>
                    </div>
                    
                    {item.description && (
                      <p className="text-grey-600 mb-3">{item.description}</p>
                    )}
                    
                    <div className="text-sm text-grey-500">
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

export default CarpoolPage;
