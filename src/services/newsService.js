// News service for LocalHub - Data Layer

import { createNewsData } from '../types';

// News service class
class NewsService {
  constructor() {
    this.cache = null;
    this.cacheExpiry = 15 * 60 * 1000; // 15 minutes
    this.apiUrl = 'https://newsapi.org/v2/everything';
    this.apiKey = 'f3c8e34982b44a50b0ee3409654bce56';
  }

  // Get news articles from NewsAPI
  async getNews() {
    try {
      // Check cache first
      if (this.cache && this.isCacheValid()) {
        return this.cache;
      }

      // Fetch news data from NewsAPI
      const newsData = await this.fetchNewsFromAPI();
      
      // Cache the result
      this.cache = newsData;
      this.cacheTimestamp = Date.now();
      
      return newsData;
    } catch (error) {
      console.error('Error fetching news data:', error);
      // Return fallback data if API fails
      return this.getFallbackNewsData();
    }
  }

  // Fetch news data from NewsAPI
  async fetchNewsFromAPI() {
    const params = new URLSearchParams({
      q: 'news',
      language: 'he',
      apiKey: this.apiKey,
      pageSize: 10,
      sortBy: 'publishedAt'
    });

    const response = await fetch(`${this.apiUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('News API returned error status');
    }

    // Transform API response to our format
    const articles = data.articles.map(article => 
      createNewsData({
        id: this.generateId(article.url),
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        source: article.source.name,
        author: article.author,
        publishedAt: article.publishedAt,
        content: article.content
      })
    );

    return {
      articles,
      totalResults: data.totalResults,
      timestamp: new Date().toISOString()
    };
  }

  // Generate a simple ID from URL
  generateId(url) {
    return url.split('/').pop().replace(/[^a-zA-Z0-9]/g, '');
  }

  // Fallback news data if API fails
  getFallbackNewsData() {
    return {
      articles: [
        createNewsData({
          id: 'fallback-1',
          title: 'חדשות מקומיות',
          description: 'עדכונים מהקהילה המקומית',
          url: '#',
          imageUrl: '',
          source: 'LocalHub',
          author: 'מערכת',
          publishedAt: new Date().toISOString(),
          content: 'חדשות מקומיות זמינות בקרוב'
        })
      ],
      totalResults: 1,
      timestamp: new Date().toISOString()
    };
  }

  // Check if cache is still valid
  isCacheValid() {
    return this.cacheTimestamp && 
           (Date.now() - this.cacheTimestamp) < this.cacheExpiry;
  }

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'לפני פחות משעה';
    } else if (diffInHours < 24) {
      return `לפני ${diffInHours} שעות`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `לפני ${diffInDays} ימים`;
    }
  }

  // Truncate text for display
  truncateText(text, maxLength = 150) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}

// Create singleton instance
const newsService = new NewsService();

export default newsService;
