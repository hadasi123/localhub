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
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        name: '',
        phone: '',
        description: ''
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
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      <p><strong>{t('phoneBook.labels.phone')}:</strong> <a href={`tel:${item.phone}`} className="text-primary hover:underline">{item.phone}</a></p>
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
