// Education Page - Presentation Layer

import React, { useState, useEffect, useCallback } from 'react';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import editIcon from '../../assets/icons/action-icons/edit.svg';
import trashIcon from '../../assets/icons/action-icons/trash.svg';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';

const EducationPage = () => {
  const { items, loading, addItem, updateItem, deleteItem } = useData('education');
  const { ensureAuthenticated, user } = useAuth() || {};
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    contact: '',
   
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
        title: '',
        description: '',
        category: '',
        contact: '',
      });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding education item:', error);
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
          title: itemToEdit.title || '',
          description: itemToEdit.description || '',
          category: itemToEdit.category || '',
          contact: itemToEdit.contact || ''
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
    <Card className="mb-0" style={{ maxWidth: 760 }}>
      <CardHeader>
        <CardTitle>{t('education.addOpportunity')}</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">{t('education.form.title')}</label>
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
              <label className="form-label">{t('education.category.label')}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">{t('education.category.select')}</option>
                <option value="language">{t('education.category.language')}</option>
                <option value="technology">{t('education.category.technology')}</option>
                <option value="arts">{t('education.category.arts')}</option>
                <option value="fitness">{t('education.category.fitness')}</option>
                <option value="cooking">{t('education.category.cooking')}</option>
                <option value="business">{t('education.category.business')}</option>
                <option value="other">{t('education.category.other')}</option>
              </select>
            </div>
           
           
            <div className="form-group">
              <label className="form-label">{t('education.form.contact')}</label>
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

            <div className="form-group">
            <label className="form-label">{t('education.form.description')}</label>
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
            <Button type="submit">{t('education.buttons.add')}</Button>
           
          </div>
        </form>
      </CardBody>
    </Card>
  );

  return (
    <PageLayout 
      title="חינוך ותרבות" 
      subtitle="הכל על מסגרות חינוכיות ותרבותיות בשכונת אריאל שרון"
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
          <h3 className="text-xl font-semibold mb-6">{t('education.availableCourses')}</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p>{t('education.loadingCourses')}</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-grey-600">{t('education.noCourses')}</p>
                <p className="text-sm text-grey-500 mt-2">
                  {t('education.beFirstCourse')}
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-grey-500">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {item.level}
                      </span>
                    </div>
                    {user && item.createdBy === user.uid && (
                      <div className="flex items-center gap-2" style={{ position: 'absolute', top: 8, insetInlineEnd: 8 }}>
                        <button type="button" aria-label={t('common.edit') || 'Edit'} onClick={() => handleOpenForm(item)}
                          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                          <img src={editIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                        <button type="button" aria-label={t('common.delete') || 'Delete'} onClick={async () => {
                          try { await deleteItem(item.id); } catch (err) { console.error('Delete failed', err); }
                        }}
                          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                          <img src={trashIcon} alt="" style={{ width: 20, height: 20 }} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </CardHeader>
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="space-y-1 text-sm text-grey-500">
                      <p><strong>{t('education.form.instructor')}:</strong> {item.instructor}</p>
                      <p><strong>{t('education.duration.label')}:</strong> {item.duration}</p>
                      <p><strong>{t('education.schedule.label')}:</strong> {item.schedule}</p>
                      <p><strong>{t('education.form.location')}:</strong> {item.location}</p>
                      <p><strong>{t('education.form.price')}:</strong> ₪{item.price}</p>
                      <p><strong>{t('education.form.contact')}:</strong> {item.contact}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
          {!showForm && (
            <FloatingActionButton
              onClick={handleOpenForm}
              label={t('education.buttons.add')}
              ariaLabel={t('education.buttons.add')}
            />
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '2px solid #e5e7eb', marginTop: '32px', marginBottom: '24px' }}></div>

        {/* Events iframe card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>כל אירועי התרבות והספורט בקריית אונו</CardTitle>
            </CardHeader>
            <CardBody style={{ padding: 0, height: '600px' }}>
              <iframe
                src="https://www.kiryatono.muni.il/events/?category=0&daterange=3months"
                title="אירועי תרבות וספורט בקריית אונו"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                loading="lazy"
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default EducationPage;
