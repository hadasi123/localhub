// Phone Book Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';

const PhoneBookPage = () => {
  const { items, loading, addItem } = useData('phone-book');
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    description: '',
    emergency: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        category: '',
        description: '',
        emergency: false
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <PageLayout 
      title="מספרי טלפון חשובים" 
    >
      <div className="fade-in">
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('phoneBook.addContact')}</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">{t('phoneBook.form.name')}</label>
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
                    <label className="form-label">{t('phoneBook.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('phoneBook.form.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('phoneBook.form.category')}</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('phoneBook.form.selectCategory')}</option>
                      <option value="emergency">{t('phoneBook.categories.emergency')}</option>
                      <option value="healthcare">{t('phoneBook.categories.healthcare')}</option>
                      <option value="government">{t('phoneBook.categories.government')}</option>
                      <option value="utilities">{t('phoneBook.categories.utilities')}</option>
                      <option value="business">{t('phoneBook.categories.business')}</option>
                      <option value="personal">{t('phoneBook.categories.personal')}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('phoneBook.form.address')}</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group flex items-center">
                    <input
                      type="checkbox"
                      name="emergency"
                      checked={formData.emergency}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="form-label mb-0">{t('phoneBook.form.emergency')}</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">{t('phoneBook.form.description')}</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder={t('phoneBook.form.descriptionPlaceholder')}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">{t('phoneBook.buttons.add')}</Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    {t('phoneBook.buttons.cancel')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <div>
          <h3 className="text-2xl font-semibold mb-6">{t('phoneBook.directory.communityContacts')}</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>{t('phoneBook.loading')}</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">{t('phoneBook.directory.noContacts')}</p>
                <p className="text-sm text-grey-500 mt-2">
                  {t('phoneBook.directory.beFirst')}
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className={item.emergency ? 'border-red-200 bg-red-50' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      {item.emergency && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                          {t('phoneBook.labels.emergency')}
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {t(`phoneBook.categories.${item.category}`)}
                    </span>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      <p><strong>{t('phoneBook.labels.phone')}:</strong> <a href={`tel:${item.phone}`} className="text-primary hover:underline">{item.phone}</a></p>
                      {item.email && <p><strong>{t('phoneBook.labels.email')}:</strong> <a href={`mailto:${item.email}`} className="text-primary hover:underline">{item.email}</a></p>}
                      {item.address && <p><strong>{t('phoneBook.labels.address')}:</strong> {item.address}</p>}
                      {item.description && <p className="text-grey-600">{item.description}</p>}
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
                {t('phoneBook.addContact')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PhoneBookPage;
