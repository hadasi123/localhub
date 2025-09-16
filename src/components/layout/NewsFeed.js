// News Feed component - Presentation Layer

import React from 'react';
import { useNews } from '../../hooks/useNews';
import { Card, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const NewsFeed = () => {
  const { 
    news, 
    loading, 
    error, 
    refreshNews, 
    formatDate, 
    truncateText 
  } = useNews();

  if (loading && !news) {
    return (
      <Card className="news-feed">
        <CardBody className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p>מידע בטעינה...</p>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert type="error" className="mb-4">
        <p>הטעינה נכשלה</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshNews}
          className="mt-2"
        >
          נסה שנית
        </Button>
      </Alert>
    );
  }

  if (!news || !news.articles || news.articles.length === 0) {
    return (
      <Card className="news-feed">
        <CardBody className="text-center">
          <p>אין מידע זמין</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshNews}
            className="mt-2"
          >
            Refresh
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="news-feed">
      <CardBody>
        <div className="news-header" style={{direction:'rtl'}}>
          <h3 className="news-title">חדשות מהארץ ומהעולם</h3>
        </div>
        
        <div className="news-scroll-container">
          <div className="news-list" style={{direction:'rtl'}}>
            {news.articles.map((article) => (
              <div key={article.id} className="news-item">
                <div className="news-item-content">
                  {article.imageUrl && (
                    <div className="news-image">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="news-text">
                    <h4 className="news-item-title">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="news-link"
                      >
                        {article.title}
                      </a>
                    </h4>
                    
                    <p className="news-description">
                      {truncateText(article.description, 120)}
                    </p>
                    
                    <div className="news-meta">
                      <span className="news-source">{article.source}</span>
                      <span className="news-time">{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </CardBody>
    </Card>
  );
};

export default NewsFeed;
