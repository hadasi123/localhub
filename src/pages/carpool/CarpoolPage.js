// Carpool Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';

const CarpoolPage = () => {
  const { items, loading, addItem } = useData('carpool');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    date: '',
    time: '',
    contact: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        to: '',
        date: '',
        time: '',
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

  const { t } = useI18n();

  return (
    <PageLayout 
      title={t('carpool.title') || 'קארפול'}
      subtitle={t('carpool.subtitle') || 'נסיעות שיתופיות אל ומחוץ לשכונה'}
    >
      <div className="fade-in">
        {/* Add Carpool Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('carpool.offerRequest')}</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">{t('labels.to') || 'To'}</label>
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('carpool.placeholderTo') || 'Destination'}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('carpool.date')}</label>
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
                    <label className="form-label">{t('carpool.time')}</label>
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
                    <label className="form-label">{t('carpool.contactDetails')}</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('carpool.phone')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('carpool.additionalNotes')}</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder={t('carpool.notesPlaceholder')}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:justify-end gap-4">
                  <Button type="submit" className="w-full md:w-auto">{t('carpool.submitRide')}</Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                    className="w-full md:w-auto"
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        {/* Carpool List */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">{t('carpool.availableRides')}</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>{t('carpool.loadingRides')}</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">{t('carpool.noRides')}</p>
                <p className="text-sm text-grey-500 mt-2">
                  {t('carpool.beFirstRide')}
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {item.to}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2 mb-4">
                      <p><strong>{t('carpool.date')}:</strong> {new Date(item.date).toLocaleDateString('he-IL')}</p>
                      <p><strong>{t('carpool.time')}:</strong> {item.time}</p>
                    </div>
                    
                    {item.description && (
                      <p className="text-grey-600 mb-3">{item.description}</p>
                    )}
                    
                    <div className="text-sm text-grey-500">
                      <p><strong>{t('carpool.contact')}:</strong> {item.contact}</p>
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
                {t('carpool.offerRequest')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CarpoolPage;
