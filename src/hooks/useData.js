// Data management hook - Business Logic Layer

import { useState, useEffect, useCallback } from 'react';
import dataService from '../services/dataService';

export const useData = (type) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getAllItems(type);
      setItems(data);
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${type} items:`, err);
    } finally {
      setLoading(false);
    }
  }, [type]);

  const addItem = useCallback(async (itemData) => {
    try {
      setError(null);
      const newItem = await dataService.addItem(type, itemData);
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [type]);

  const updateItem = useCallback(async (id, updates) => {
    try {
      setError(null);
      const updatedItem = await dataService.updateItem(type, id, updates);
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [type]);

  const deleteItem = useCallback(async (id) => {
    try {
      setError(null);
      await dataService.deleteItem(type, id);
      setItems(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [type]);

  const searchItems = useCallback(async (query) => {
    try {
      setError(null);
      const results = await dataService.searchItems(type, query);
      return results;
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [type]);

  const getItemsByCategory = useCallback(async (category) => {
    try {
      setError(null);
      const results = await dataService.getItemsByCategory(type, category);
      return results;
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [type]);

  const getRecentItems = useCallback(async (limit = 10) => {
    try {
      setError(null);
      const results = await dataService.getRecentItems(type, limit);
      return results;
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    searchItems,
    getItemsByCategory,
    getRecentItems,
    refresh: fetchItems
  };
};
