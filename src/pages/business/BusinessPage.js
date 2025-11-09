// Business Page - Presentation Layer

import React, { useState, useEffect, useCallback } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import editIcon from '../../assets/icons/action-icons/edit.svg';
import trashIcon from '../../assets/icons/action-icons/trash.svg';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';

const BusinessPage = () => {
  const { items, loading, addItem, updateItem, deleteItem } = useData('business');
  const { ensureAuthenticated, user } = useAuth() || {};
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    website: '',
    hours: ''
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
        name: '',
        description: '',
        address: '',
        phone: '',
        website: '',
        hours: ''
      });
      setEditingId(null);
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

  const handleOpenForm = async (itemToEdit = null) => {
    try {
      const useFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
      if (useFirebase && ensureAuthenticated) {
        await ensureAuthenticated();
      }
      if (itemToEdit) {
        setEditingId(itemToEdit.id);
        setFormData({
          name: itemToEdit.name || '',
          description: itemToEdit.description || '',
          address: itemToEdit.address || '',
          phone: itemToEdit.phone || '',
          website: itemToEdit.website || '',
          hours: itemToEdit.hours || ''
        });
      }
      setShowForm(true);
    } catch (e) {
      // cancelled
    }
  };

  const { t } = useI18n();

  // ESC close handler
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

  const renderForm = () => (
    <Card className="mb-0" style={{ maxWidth: 720 }}>
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
          </div>

          
          <div className="form-actions">
            <Button type="submit">{t('business.addBusinessBtn')}</Button>
          
          </div>
        </form>
      </CardBody>
    </Card>
  );

  return (
    <PageLayout 
      title={t('business.title')}
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
          <h3 className="text-xl font-semibold mb-6">{t('business.localBusinesses')}</h3>
          
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
            <div className="space-y-4 ">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    
                  </CardHeader>
                  <CardBody>
                    <p className="text-grey-600 mb-3" style={{marginTop:8}}>{item.description}</p>
                    <div className="space-y-1 text-sm text-grey-500">
                      {item.address && <p><strong>{t('business.fields.address')}:</strong> {item.address}</p>}
                      {item.phone && <p><strong>{t('business.fields.phone')}:</strong> {item.phone}</p>}
                      {item.website && <p><strong>{t('business.fields.website')}:</strong> <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{item.website}</a></p>}
                      
                    </div>
                    {user && item.createdBy === user.uid && (
                      <div className="flex" style={{  flexDirection: 'row', alignSelf:'flex-end',gap:16, justifyContent: 'flex-end' }}>
                        <button type="button" aria-label={t('common.edit')} onClick={() => handleOpenForm(item)}
                          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                          <img src={editIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label={t('common.delete')} onClick={async () => {
                          try { await deleteItem(item.id); } catch (err) { console.error('Delete failed', err); }
                        }}
                          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
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
                ariaLabel={t('business.addBusinessBtn')}
              />
            )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BusinessPage;
