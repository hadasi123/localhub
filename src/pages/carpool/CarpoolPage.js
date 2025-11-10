// Carpool Page - Presentation Layer

import React, { useState, useEffect, useCallback } from 'react';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import editIcon from '../../assets/icons/action-icons/edit.svg';
import trashIcon from '../../assets/icons/action-icons/trash.svg';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import TextWithPhoneLinks from '../../components/ui/TextWithPhoneLinks';

const CarpoolPage = () => {
  const { items, loading, addItem, updateItem, deleteItem } = useData('carpool');
  const { ensureAuthenticated, user } = useAuth() || {};
  const handleOpenForm = async (itemToEdit = null) => {
    try {
      const useFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
      if (useFirebase && ensureAuthenticated) {
        await ensureAuthenticated();
      }
      if (itemToEdit) {
        setEditingId(itemToEdit.id);
        setFormData({
          to: itemToEdit.to || '',
          date: itemToEdit.date || '',
          time: itemToEdit.time || '',
          contact: itemToEdit.contact || '',
          description: itemToEdit.description || ''
        });
      }
      setShowForm(true);
    } catch (e) {
      // cancelled or failed
    }
  };
  const [editingId, setEditingId] = useState(null);
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
      if (editingId) {
        await updateItem(editingId, formData);
      } else {
        await addItem(formData);
      }
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
        <CardTitle>{t('carpool.offerRequest')}</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">{t('labels.to') }</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                className="form-input"
                placeholder={t('carpool.placeholderTo') }
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
            <div className="form-group">
            <label className="form-label">{t('carpool.additionalNotes')}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input form-textarea"
            />
          </div>
          </div>
          
          <div className="form-actions">
            <Button type="submit" className="w-full md:w-auto">{t('carpool.submitRide')}</Button>
          
          </div>
        </form>
      </CardBody>
    </Card>
  );

  return (
    <PageLayout 
      title={t('carpool.title') || 'קארפול'}
      subtitle={t('carpool.subtitle') || 'נסיעות שיתופיות אל ומחוץ לשכונה'}
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

        {/* Carpool List */}
        <div>
          <h3 className="text-xl font-semibold mb-6">{t('carpool.availableRides')}</h3>
          
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
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  
                  <CardBody>
                    <div className="text-sm text-grey-500">
                      <p><strong>{t('carpool.to')}:</strong> {item.to}</p>
                      <p><strong>{t('carpool.date')}:</strong> {new Date(item.date).toLocaleDateString('he-IL')}</p>
                      <p><strong>{t('carpool.time')}:</strong> {item.time}</p>
                      {item.description && <p><strong>{t('carpool.description')}:</strong> <TextWithPhoneLinks text={item.description} /></p>}
                      <p><strong>{t('carpool.contact')}:</strong> <TextWithPhoneLinks text={item.contact} /></p>
                    </div>
                    {user && item.createdBy === user.uid && (
                      <div className="flex" style={{  flexDirection: 'row', alignSelf:'flex-end',gap:16, justifyContent: 'flex-end' }}>
                        <button type="button" aria-label={t('common.edit')} onClick={() => handleOpenForm(item)} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                          <img src={editIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label={t('common.delete')} onClick={async () => { try { await deleteItem(item.id); } catch (err) { console.error('Delete failed', err); } }} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
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
              ariaLabel={t('carpool.offerRequest')}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CarpoolPage;
