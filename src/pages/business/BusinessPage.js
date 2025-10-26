// Business Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';

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

  const { t } = useI18n();

  return (
    <PageLayout 
      title={t('business.title')}
    >
      <div className="fade-in">
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('business.addBusiness')}</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">{t('labels.businessName')}</label>
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
                    <label className="form-label">{t('labels.category')}</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('common.selectCategory')}</option>
                      <option value="restaurant">מסעדה</option>
                      <option value="retail">קמעונאות</option>
                      <option value="services">שירותים</option>
                      <option value="healthcare">בריאות</option>
                      <option value="automotive">רכב</option>
                      <option value="beauty">יופי ורווחה</option>
                      <option value="other">{t('common.other')}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.website')}</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.hours')}</label>
                    <input
                      type="text"
                      name="hours"
                      value={formData.hours}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="לדוגמה: ב'-ו' 09:00-18:00"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">{t('labels.address')}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">{t('labels.description')}</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">{t('labels.services')}</label>
                  <textarea
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder="פרט את השירותים המוצעים"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">{t('business.addBusinessBtn')}</Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <div>
          <h3 className="text-2xl font-semibold mb-6">{t('business.localBusinesses')}</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>{t('business.loadingBusinesses')}</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">{t('business.noBusinesses')}</p>
                <p className="text-sm text-grey-500 mt-2">
                  {t('business.beFirstBusiness')}
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
          {!showForm && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto"
              >
                {t('business.addBusinessBtn')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BusinessPage;
