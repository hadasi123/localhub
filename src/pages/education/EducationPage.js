// Education Page - Presentation Layer

import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';

const EducationPage = () => {
  const { items, loading, addItem } = useData('education');
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    instructor: '',
    contact: '',
    price: 0,
    schedule: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData);
      setFormData({
        title: '',
        description: '',
        category: '',
        level: '',
        duration: '',
        instructor: '',
        contact: '',
        price: 0,
        schedule: '',
        location: ''
      });
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

  return (
    <PageLayout 
      title="חינוך ותרבות" 
      subtitle="הכל על מסגרות חינוכיות ותרבותיות בשכונת אריאל שרון"
    >
      <div className="fade-in">
        {showForm && (
          <Card className="mb-8">
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
                    <label className="form-label">{t('education.level.label')}</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="beginner">{t('education.level.beginner')}</option>
                      <option value="intermediate">{t('education.level.intermediate')}</option>
                      <option value="advanced">{t('education.level.advanced')}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('education.duration.label')}</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('education.duration.placeholder')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('education.form.instructor')}</label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('education.form.price')}</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('education.schedule.label')}</label>
                    <input
                      type="text"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('education.schedule.placeholder')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('education.form.location')}</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{t('education.form.contact')}</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
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
                
                <div className="flex gap-4">
                  <Button type="submit">{t('education.buttons.add')}</Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    {t('education.buttons.cancel')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <div>
          <h3 className="text-2xl font-semibold mb-6">{t('education.availableCourses')}</h3>
          
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto"
              >
                {t('education.addCourse')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default EducationPage;
