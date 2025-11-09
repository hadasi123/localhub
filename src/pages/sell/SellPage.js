// Sell Page - Presentation Layer

import React, { useState, useEffect, useCallback } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import { useData } from '../../hooks/useData';
import editIcon from '../../assets/icons/action-icons/edit.svg';
import trashIcon from '../../assets/icons/action-icons/trash.svg';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';

const SellPage = () => {
  const { items, loading, addItem, updateItem, deleteItem } = useData('sell');
  const { t } = useI18n();
  const { ensureAuthenticated, user } = useAuth() || {};
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const handleOpenForm = async (itemToEdit = null) => {
    try {
      const useFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
      if (useFirebase && ensureAuthenticated) {
        await ensureAuthenticated();
      }
      if (itemToEdit) {
        setEditingId(itemToEdit.id);
        setFormData({
          description: itemToEdit.description || '',
          price: itemToEdit.price ?? 0,
          category: itemToEdit.category || '',
          contact: itemToEdit.contact || '',
          condition: itemToEdit.condition || 'good'
        });
      }
      setShowForm(true);
    } catch (e) {
      // User cancelled auth or failed — keep form closed
    }
  };
  const [formData, setFormData] = useState({
    description: '',
    price: 0,
    category: '',
    contact: '',
    condition: 'good'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateItem(editingId, formData);
      } else {
        await addItem(formData);
      }
      setFormData({
        description: '',
        price: 0,
        category: '',
        contact: '',
        condition: 'good'
      });
      setEditingId(null);
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

  

  // ESC close handler and scroll lock
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape' && showForm) setShowForm(false);
  }, [showForm]);

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  useEffect(() => {
    if (showForm) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [showForm]);

  // Map category to badge background color using CSS variables from globals.css
  const getCategoryBadgeStyle = (category) => {
    let backgroundColor = 'var(--grey-200)';
    switch (category) {
      case 'giveaway':
        backgroundColor = 'var(--yellow)'; // למסירה
        break;
      case 'sale':
        backgroundColor = 'var(--warning)'; // למכירה
        break;
      case 'rent':
        backgroundColor = 'var(--info-secondary)'; // להשכרה
        break;
      default:
        backgroundColor = 'var(--grey-200)';
    }
    return {
      backgroundColor,
      color: 'var(--grey-900)',
      padding: '2px 8px',
      marginLeft: 8,
      borderRadius: 8,
      display: 'inline-block'
    };
  };

  const renderForm = () => (
    <Card className="mb-0" style={{ maxWidth: 720 }}>
      <CardHeader>
        <CardTitle>{t('sell.listItem')}</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
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
                <option value="sale">{t('sell.category.sale')}</option>
                <option value="giveaway">{t('sell.category.giveaway')}</option>
                <option value="rent">{t('sell.category.rent')}</option>
              </select>
            </div>
            
            {formData.category !== 'giveaway' && (
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
            )}

            {formData.category === 'giveaway' && (
              <div className="form-group">
                <label className="form-label">{t('sell.fields.itemCondition')}</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="new">{t('sell.conditions.new')}</option>
                  <option value="like-new">{t('sell.conditions.like-new')}</option>
                  <option value="good">{t('sell.conditions.good')}</option>
                  <option value="fair">{t('sell.conditions.fair')}</option>
                  <option value="poor">{t('sell.conditions.poor')}</option>
                </select>
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">{t('labels.contact')}</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="form-input"
                placeholder={t('labels.contactDetails')}
                required
              />
            </div>
            
          </div>
          
          <div className="form-group" style={{ marginTop: '16px' }}>
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
          
          <div className="form-actions">
            <Button type="submit">{t('sell.listItem')}</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );

  return (
    <PageLayout 
      title={t('sell.title')}
    >
      <div className="fade-in">
        {showForm && (
          <div className="modal-backdrop" onMouseDown={(e) => {
            if (e.target.classList.contains('modal-backdrop')) setShowForm(false);
          }}>
            <div className="modal-container fade-in-up">
              {renderForm()}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-6">{t('sell.itemsForSale')}</h3>
          
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
            <div className="space-y-1">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div style={{ marginBottom: 14}}>
                      <span className="text-xs" style={getCategoryBadgeStyle(item.category)}>
                        {t(`sell.category.${item.category}`)}
                      </span>
                      <span className="text-xs">{item.description}</span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    
                    <div className="text-sm text-grey-500" style={{marginTop:8}}>
                      {item.category === 'giveaway' && (
                        <p><strong>{t('sell.fields.condition')}:</strong> {t(`sell.conditions.${item.condition}`)}</p>
                      )}
                      {item.category !== 'giveaway' &&  (
                        <p><strong>{t('sell.fields.price')}:</strong> ₪{item.price}</p>
                      )}
                      <p><strong>{t('sell.fields.contact')}:</strong> {item.contact}</p>
                      <p><strong>{t('sell.fields.listed')}:</strong> {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    {user && item.createdBy === user.uid && (
                      <div className="flex" style={{  flexDirection: 'row', alignSelf:'flex-end',gap:16, justifyContent: 'flex-end' }}>
                        <button type="button" aria-label={t('common.edit') || 'Edit'} onClick={() => handleOpenForm(item)} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                          <img src={editIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label={t('common.delete') || 'Delete'} onClick={async () => { try { await deleteItem(item.id); } catch (err) { console.error('Delete failed', err); } }} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                          <img src={trashIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
          {!showForm && (
            <FloatingActionButton
              onClick={handleOpenForm}
              label={t('common.add')}
              ariaLabel={t('sell.sellItem')}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SellPage;
