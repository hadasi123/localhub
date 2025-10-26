// Sell Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';

const SellPage = () => {
  const { items, loading, addItem } = useData('sell');
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    condition: 'good',
    seller: '',
    contact: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: '',
        condition: 'good',
        seller: '',
        contact: '',
        location: ''
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

  const getConditionColor = (condition) => {
    const colors = {
      new: 'bg-green-100 text-green-800',
      'like-new': 'bg-blue-100 text-blue-800',
      good: 'bg-yellow-100 text-yellow-800',
      fair: 'bg-orange-100 text-orange-800',
      poor: 'bg-red-100 text-red-800'
    };
    return colors[condition] || colors.good;
  };

  return (
    <PageLayout 
      title={t('sell.title')}
    >
      <div className="fade-in">
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('sell.listItem')}</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">{t('labels.title')}</label>
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
                    <label className="form-label">{t('labels.category')}</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('common.selectCategory')}</option>
                      <option value="electronics">{t('sell.categories.electronics')}</option>
                      <option value="furniture">{t('sell.categories.furniture')}</option>
                      <option value="clothing">{t('sell.categories.clothing')}</option>
                      <option value="books">{t('sell.categories.books')}</option>
                      <option value="vehicles">{t('sell.categories.vehicles')}</option>
                      <option value="home">{t('sell.categories.home')}</option>
                      <option value="sports">{t('sell.categories.sports')}</option>
                      <option value="toys">{t('sell.categories.toys')}</option>
                      <option value="other">{t('sell.categories.other')}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.price')} (₪)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.condition')}</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="new">{t('sell.conditions.new')}</option>
                      <option value="like-new">{t('sell.conditions.like-new')}</option>
                      <option value="good">{t('sell.conditions.good')}</option>
                      <option value="fair">{t('sell.conditions.fair')}</option>
                      <option value="poor">{t('sell.conditions.poor')}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.seller')}</label>
                    <input
                      type="text"
                      name="seller"
                      value={formData.seller}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.contact')}</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('labels.contact')}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('labels.location')}</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('labels.location')}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">{t('labels.description')}</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input form-textarea"
                    placeholder={t('labels.description')}
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">{t('sell.listItem')}</Button>
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
          <h3 className="text-2xl font-semibold mb-6">{t('sell.itemsForSale')}</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>{t('sell.loadingItems')}</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">{t('sell.noItemsForSale')}</p>
                <p className="text-sm text-grey-500 mt-2">
                  {t('sell.beFirstList')}
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
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">₪{item.price}</div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(item.condition)}`}>
                          {t(`sell.conditions.${item.condition}`) || item.condition}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {t(`sell.categories.${item.category}`) || item.category}
                    </span>
                  </CardHeader>
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="space-y-1 text-sm text-grey-500">
                      <p><strong>Seller:</strong> {item.seller}</p>
                      <p><strong>Contact:</strong> {item.contact}</p>
                      {item.location && <p><strong>Location:</strong> {item.location}</p>}
                      <p><strong>Listed:</strong> {new Date(item.date).toLocaleDateString()}</p>
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
                {t('sell.sellItem')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SellPage;
