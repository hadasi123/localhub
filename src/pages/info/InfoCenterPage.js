// Info Center Page - Presentation Layer

import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
// No cards here; simple sections layout
import { useI18n } from '../../i18n';

// Icons (assume these files exist in info-icons folder)
import publicTransportationIcon from '../../assets/icons/info-icons/transportation.svg';
import recycleIcon from '../../assets/icons/info-icons/recycle.svg';
import municipalSchedualIcon from '../../assets/icons/info-icons/recycle.svg';
import kindergartensIcon from '../../assets/icons/info-icons/kindergartens.svg';
import dayCareIcon from '../../assets/icons/info-icons/daycare.svg';
import classesIcon from '../../assets/icons/info-icons/classes.svg';
import municipalContactsIcon from '../../assets/icons/info-icons/contact.svg';
import synagogActivityIcon from '../../assets/icons/info-icons/synagog.svg';
import schoolHolidaysIcon from '../../assets/icons/info-icons/schoolHolidays.svg';

const subjectsConfig = (t) => ([
  {
    key: 'publicTransportation',
    icon: publicTransportationIcon,
    title: t('infoCenter.subjects.publicTransportation.title'),
    text: t('infoCenter.subjects.publicTransportation.text'),
    link: t('infoCenter.subjects.publicTransportation.link'),
    linkLabel: t('infoCenter.subjects.publicTransportation.linkLabel'),
  },
  {
    key: 'recycle',
    icon: recycleIcon,
    title: t('infoCenter.subjects.recycle.title'),
    text: t('infoCenter.subjects.recycle.text'),
    link: t('infoCenter.subjects.recycle.link'),
    linkLabel: t('infoCenter.subjects.recycle.linkLabel'),
  },
  {
    key: 'municipalSchedual',
    icon: municipalSchedualIcon,
    title: t('infoCenter.subjects.municipalSchedual.title'),
    text: t('infoCenter.subjects.municipalSchedual.text'),
    link: t('infoCenter.subjects.municipalSchedual.link'),
    linkLabel: t('infoCenter.subjects.municipalSchedual.linkLabel'),
  },
  {
    key: 'kindergartens',
    icon: kindergartensIcon,
    title: t('infoCenter.subjects.kindergartens.title'),
    text: t('infoCenter.subjects.kindergartens.text'),
    link: t('infoCenter.subjects.kindergartens.link'),
    linkLabel: t('infoCenter.subjects.kindergartens.linkLabel'),
  },
  {
    key: 'dayCare',
    icon: dayCareIcon,
    title: t('infoCenter.subjects.dayCare.title'),
    text: t('infoCenter.subjects.dayCare.text'),
    link: t('infoCenter.subjects.dayCare.link'),
    linkLabel: t('infoCenter.subjects.dayCare.linkLabel'),
  },
  {
    key: 'classes',
    icon: classesIcon,
    title: t('infoCenter.subjects.classes.title'),
    text: t('infoCenter.subjects.classes.text'),
    link: t('infoCenter.subjects.classes.link'),
    linkLabel: t('infoCenter.subjects.classes.linkLabel'),
  },
  {
    key: 'municipalContacts',
    icon: municipalContactsIcon,
    title: t('infoCenter.subjects.municipalContacts.title'),
    text: t('infoCenter.subjects.municipalContacts.text'),
    link: t('infoCenter.subjects.municipalContacts.link'),
    linkLabel: t('infoCenter.subjects.municipalContacts.linkLabel'),
  },
  {
    key: 'synagogActivity',
    icon: synagogActivityIcon,
    title: t('infoCenter.subjects.synagogActivity.title'),
    text: t('infoCenter.subjects.synagogActivity.text'),
    link: t('infoCenter.subjects.synagogActivity.link'),
    linkLabel: t('infoCenter.subjects.synagogActivity.linkLabel'),
  },
  {
    key: 'schoolHolidays',
    icon: schoolHolidaysIcon,
    title: t('infoCenter.subjects.schoolHolidays.title'),
    text: t('infoCenter.subjects.schoolHolidays.text'),
    link: t('infoCenter.subjects.schoolHolidays.link'),
    linkLabel: t('infoCenter.subjects.schoolHolidays.linkLabel'),
  },
]);

const InfoCenterPage = () => {
  const { t } = useI18n();
  const subjects = subjectsConfig(t);

  return (
    <PageLayout title={t('infoCenter.title')} subtitle={t('infoCenter.subtitle')}>
      <div className="fade-in">
        <div className="container">
          {/* Plain vertical list with separators; enlarged typography */}
          <div style={{ display: 'block' }}>
            {subjects.map((s, idx) => (
              <section
                key={s.key}
                style={{
                  padding: '20px 4px',
                  borderTop: idx === 0 ? 'none' : '1px solid var(--accent-green)'
                }}
              >
                <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                  <img src={s.icon} alt="" style={{ width: 40, height: 40 }} aria-hidden="true" />
                  <h2 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-md)',
                    lineHeight: 1.3,
                    fontWeight: 600,
                    color: 'var(--grey-900)'
                  }}>{s.title}</h2>
                </header>
                <p style={{
                  margin: 0,
                  fontSize: 'var(--font-size-sm)',
                  lineHeight: 1.6,
                  color: 'var(--grey-700)',
                  fontWeight: 400
                }}>{s.text}</p>
                {s.link && (
                  <p style={{ marginTop: 12, fontSize: 'var(--font-size-sm)' }}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      style={{ fontWeight: 500 }}
                    >
                      {s.linkLabel || s.link}
                    </a>
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InfoCenterPage;
