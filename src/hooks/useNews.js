// News hook for LocalHub - Business Logic Layer

import { useState, useEffect, useCallback } from 'react';
import newsService from '../services/newsService';

export const useNews = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await newsService.getNews();
      setNews(data);
    } catch (err) {
      setError('Failed to fetch news data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refreshNews = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  const formatDate = useCallback((dateString) => {
    return newsService.formatDate(dateString);
  }, []);

  const truncateText = useCallback((text, maxLength) => {
    return newsService.truncateText(text, maxLength);
  }, []);

  const getRecentArticles = useCallback((count = 5) => {
    if (!news || !news.articles) return [];
    return news.articles.slice(0, count);
  }, [news]);

  return {
    news,
    loading,
    error,
    refreshNews,
    formatDate,
    truncateText,
    getRecentArticles
  };
};
