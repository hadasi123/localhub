// LocalStorage-backed Data service for LocalHub (moved from dataService.js)

import { 
  createLostAndFoundItem,
  createCarpoolItem,
  createUpdateItem,
  createEducationItem,
  createBusinessItem,
  createPhoneBookItem,
  createSellItem
} from '../types';

// Local storage keys
const STORAGE_KEYS = {
  LOST_AND_FOUND: 'localhub_lost_and_found',
  CARPOOL: 'localhub_carpool',
  UPDATES: 'localhub_updates',
  EDUCATION: 'localhub_education',
  BUSINESS: 'localhub_business',
  PHONE_BOOK: 'localhub_phone_book',
  SELL: 'localhub_sell'
};

// Data service class
class DataService {
  constructor() {
    this.initializeData();
  }

  // Initialize with sample data if storage is empty
  initializeData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });
  }

  // Generic CRUD operations
  async getAllItems(type) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS[type.toUpperCase()]);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting ${type} items:`, error);
      return [];
    }
  }

  async getItem(type, id) {
    try {
      const items = await this.getAllItems(type);
      return items.find(item => item.id === id);
    } catch (error) {
      console.error(`Error getting ${type} item:`, error);
      return null;
    }
  }

  async addItem(type, itemData) {
    try {
      const items = await this.getAllItems(type);
      const newItem = this.createItemByType(type, {
        ...itemData,
        id: this.generateId()
      });
      items.push(newItem);
      await this.saveItems(type, items);
      return newItem;
    } catch (error) {
      console.error(`Error adding ${type} item:`, error);
      throw error;
    }
  }

  async updateItem(type, id, updates) {
    try {
      const items = await this.getAllItems(type);
      const index = items.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Item not found');
      }
      items[index] = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await this.saveItems(type, items);
      return items[index];
    } catch (error) {
      console.error(`Error updating ${type} item:`, error);
      throw error;
    }
  }

  async deleteItem(type, id) {
    try {
      const items = await this.getAllItems(type);
      const filteredItems = items.filter(item => item.id !== id);
      await this.saveItems(type, filteredItems);
      return true;
    } catch (error) {
      console.error(`Error deleting ${type} item:`, error);
      throw error;
    }
  }

  // Save items to localStorage
  async saveItems(type, items) {
    try {
      localStorage.setItem(STORAGE_KEYS[type.toUpperCase()], JSON.stringify(items));
    } catch (error) {
      console.error(`Error saving ${type} items:`, error);
      throw error;
    }
  }

  // Create item by type
  createItemByType(type, data) {
    switch (type.toLowerCase()) {
      case 'lost-and-found':
        return createLostAndFoundItem(data);
      case 'carpool':
        return createCarpoolItem(data);
      case 'updates':
        return createUpdateItem(data);
      case 'education':
        return createEducationItem(data);
      case 'business':
        return createBusinessItem(data);
      case 'phone-book':
        return createPhoneBookItem(data);
      case 'sell':
        return createSellItem(data);
      default:
        throw new Error(`Unknown item type: ${type}`);
    }
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Search items
  async searchItems(type, query) {
    try {
      const items = await this.getAllItems(type);
      const searchTerm = query.toLowerCase();
      return items.filter(item => {
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        );
      });
    } catch (error) {
      console.error(`Error searching ${type} items:`, error);
      return [];
    }
  }

  // Get items by category
  async getItemsByCategory(type, category) {
    try {
      const items = await this.getAllItems(type);
      return items.filter(item => item.category === category);
    } catch (error) {
      console.error(`Error getting ${type} items by category:`, error);
      return [];
    }
  }

  // Get recent items
  async getRecentItems(type, limit = 10) {
    try {
      const items = await this.getAllItems(type);
      return items
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    } catch (error) {
      console.error(`Error getting recent ${type} items:`, error);
      return [];
    }
  }
}

// Create singleton instance
const dataService = new DataService();

export default dataService;
