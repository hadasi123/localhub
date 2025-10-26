import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { useI18n } from '../../i18n';

const LostAndFoundPage = () => {
  const { t } = useI18n();

  return (
    <PageLayout title={t('lostAndFound.title')}>
      <div style={{ padding: 20 }}>
        <h2>{t('lostAndFound.title')}</h2>
        <p>{t('lostAndFound.recentReports')}</p>
        {/* Minimal placeholder while original file is repaired */}
      </div>
    </PageLayout>
  );
};

export default LostAndFoundPage;
