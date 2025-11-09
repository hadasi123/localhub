import React, { useState, useEffect, useCallback } from 'react';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import editIcon from '../../assets/icons/action-icons/edit.svg';
import trashIcon from '../../assets/icons/action-icons/trash.svg';
import { useI18n } from '../../i18n';
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';

const LostAndFoundPage = () => {
  const { items, loading, addItem, updateItem, deleteItem, error, refresh } = useData('lost-and-found');
  const { ensureAuthenticated, user } = useAuth() || {};
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({ description: '', contact: '' });
  const [editingId, setEditingId] = useState(null);
  const { t } = useI18n();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const useFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
      const dataToSave = { ...formData };

      // handle image upload when a file is selected and Firebase storage is enabled
      if (selectedFile) {
        if (useFirebase) {
          const storageRef = ref(storage, `lostAndfounds/${Date.now()}_${selectedFile.name}`);
          const snapshot = await uploadBytes(storageRef, selectedFile);
          const url = await getDownloadURL(snapshot.ref);
          dataToSave.image = url;
        } else {
          // fallback: read file as data URL and save (localStorage)
          const toDataUrl = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          try {
            dataToSave.image = await toDataUrl(selectedFile);
          } catch (err) {
            console.warn('Failed to read image file locally', err);
          }
        }
      }

      if (editingId) {
        await updateItem(editingId, dataToSave);
      } else {
        await addItem(dataToSave);
      }
      setFormData({ description: '', contact: '' });
      setEditingId(null);
  setSelectedFile(null);
      setPreviewUrl(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      try {
        setPreviewUrl(URL.createObjectURL(file));
      } catch (err) {
        setPreviewUrl(null);
      }
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleOpenForm = async (itemToEdit = null) => {
    try {
      const useFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
      if (useFirebase && ensureAuthenticated) {
        await ensureAuthenticated();
      }
      if (itemToEdit) {
        setEditingId(itemToEdit.id);
        setFormData({ description: itemToEdit.description || '', contact: itemToEdit.contact || '' });
      }
      setShowForm(true);
    } catch (e) {
      // cancelled
    }
  };

  // Close on ESC key
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape' && showForm) {
      setShowForm(false);
    }
  }, [showForm]);

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  // Prevent scroll when modal open
  useEffect(() => {
    if (showForm) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [showForm]);

  const renderForm = () => (
    <Card className="mb-0" style={{ maxWidth: 680 }}>
      <CardHeader>
        <CardTitle>{t('lostAndFound.report')}</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">{t('labels.contact')}</label>
              <input className="form-input" name="contact" placeholder={t('labels.contactDetails')} value={formData.contact} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">{t('labels.description')}</label>
              <textarea className="form-input form-textarea" name="description" placeholder={t('labels.description')} value={formData.description} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">הוספת תמונה (לא חובה)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
              {previewUrl && <img src={previewUrl} alt="preview" style={{ maxWidth: 120, marginTop: 8 }} />}
            </div>
          </div>

          <div className="form-actions">
            <Button type="submit">הוספת דיווח</Button>
            
          </div>
        </form>
      </CardBody>
    </Card>
  );

  return (
    <PageLayout title={t('lostAndFound.title')}>
      <div className="fade-in">
        {showForm && (
          <div className="modal-backdrop" onMouseDown={(e) => {
            // close if clicking backdrop (not the card itself)
            if (e.target.classList.contains('modal-backdrop')) {
              setShowForm(false);
            }
          }}>
            <div className="modal-container fade-in-up">
              {renderForm()}
            </div>
          </div>
        )}

        <div>
          {error && (
            <Card className="mb-4">
              <CardBody>
                <p className="text-red-600">Error loading items: {error}</p>
                <div className="mt-2">
                  <Button onClick={() => refresh()}>{t('common.refresh') || 'Refresh'}</Button>
                </div>
              </CardBody>
            </Card>
          )}
          <h3 className="text-xl font-semibold mb-6">{t('lostAndFound.recentReports')}</h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>{t('lostAndFound.loadingItems')}</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">{t('lostAndFound.noItems')}</p>
                <p className="text-sm text-grey-500 mt-2">{t('lostAndFound.beFirstReport')}</p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="text-sm text-grey-500 space-y-1">
                      <p><strong>{t('labels.contact')}:</strong> {item.contact}</p>
                      
                    </div>
                    {user && item.createdBy === user.uid && (
                      <div className="flex" style={{ flexDirection: 'row', alignSelf: 'flex-end', gap: 16, justifyContent: 'flex-end' }}>
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
              ariaLabel={t('lostAndFound.report')}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LostAndFoundPage;
