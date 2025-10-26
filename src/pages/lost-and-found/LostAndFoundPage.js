import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const LostAndFoundPage = () => {
  const { items, loading, addItem, error, refresh } = useData('lost-and-found');
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({ description: '', contact: '' });
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

  await addItem(dataToSave);
  setFormData({ description: '', contact: '' });
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

  return (
    <PageLayout title={t('lostAndFound.title')}>
      <div className="fade-in">
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('lostAndFound.report')}</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">{t('labels.contact')}</label>
                    <input className="form-input" name="contact" value={formData.contact} onChange={handleInputChange} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('labels.description')}</label>
                    <textarea className="form-input form-textarea" name="description" value={formData.description} onChange={handleInputChange} required />
                  </div>

                  

                  <div className="form-group">
                    <label className="form-label">Image (optional)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
                    {previewUrl && <img src={previewUrl} alt="preview" style={{ maxWidth: 120, marginTop: 8 }} />}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">{t('common.submit')}</Button>
                  <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                    {t('common.cancel')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
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
          <h3 className="text-2xl font-semibold mb-6">{t('lostAndFound.recentReports')}</h3>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id}>
                  
                  <CardBody>
                    <p className="text-grey-600 mb-3">{item.description}</p>
                    <div className="text-sm text-grey-500 space-y-1">
                      <p><strong>{t('labels.contact')}:</strong> {item.contact}</p>
                      
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
                {t('lostAndFound.report')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LostAndFoundPage;
