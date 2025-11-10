// Phone Book Page - Presentation Layer

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

const PhoneBookPage = () => {
  const { items, loading, addItem, updateItem, deleteItem } = useData('phone-book');
  const { ensureAuthenticated, user } = useAuth() || {};
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
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
        name: '',
        phone: '',
        description: ''
      });
      setEditingId(null);
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
          phone: itemToEdit.phone || '',
          description: itemToEdit.description || ''
        });
      }
      setShowForm(true);
    } catch (e) {
      // cancelled
    }
  };

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
    <Card className="mb-0" style={{ maxWidth: 640 }}>
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
            <label className="form-label">{t('phoneBook.form.description')}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input form-textarea"
            />
          </div>
          </div>
          
          <div className="form-actions">
            <Button type="submit">{t('phoneBook.buttons.add')}</Button>

          </div>
        </form>
      </CardBody>
    </Card>
  );

  return (
    <PageLayout 
      title="מספרי טלפון חשובים" 
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
          <h3 className="text-xl font-semibold mb-6">{t('phoneBook.directory.communityContacts')}</h3>
          
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
            <div className="space-y-1">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="text-sm text-grey-500" style={{ marginTop: 8 }}>
                      <p><strong>{t('phoneBook.labels.phone')}:</strong> <a href={`tel:${item.phone}`} className="text-primary hover:underline">{item.phone}</a></p>
                      {item.description && (
                        <p><strong>{t('phoneBook.labels.description')}:</strong> <span className="text-grey-600"><TextWithPhoneLinks text={item.description} /></span></p>
                      )}
                    </div>
                    {user && item.createdBy === user.uid && (
                      <div className="flex" style={{ flexDirection: 'row', alignSelf: 'flex-end', gap: 16, justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          aria-label={t('common.edit') || 'Edit'}
                          onClick={() => handleOpenForm(item)}
                          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}
                        >
                          <img src={editIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label={t('common.delete') || 'Delete'}
                          onClick={async () => {
                            try { await deleteItem(item.id); } catch (err) { console.error('Delete failed', err); }
                          }}
                          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}
                        >
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
                ariaLabel={t('phoneBook.addContact')}
              />
            )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PhoneBookPage;
