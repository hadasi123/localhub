// Firestore-backed data adapter implementing a subset of dataService's API
// so you can switch data providers without changing hooks.

import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from './firebase';
import { 
  createLostAndFoundItem,
  createCarpoolItem,
  createUpdateItem,
  createEducationItem,
  createBusinessItem,
  createPhoneBookItem,
  createSellItem
} from '../types';

const collectionNameForType = (type) => {
  switch (type.toLowerCase()) {
    case 'lost-and-found': return 'lostAndfounds';
    case 'carpool': return 'carpool';
    case 'updates': return 'updates';
    case 'education': return 'education';
    case 'business': return 'business';
    case 'phone-book': return 'phone_book';
    case 'sell': return 'sell';
    default: return type.toLowerCase();
  }
};

const createItemByType = (type, data) => {
  switch (type.toLowerCase()) {
    case 'lost-and-found': return createLostAndFoundItem(data);
    case 'carpool': return createCarpoolItem(data);
    case 'updates': return createUpdateItem(data);
    case 'education': return createEducationItem(data);
    case 'business': return createBusinessItem(data);
    case 'phone-book': return createPhoneBookItem(data);
    case 'sell': return createSellItem(data);
    default: throw new Error(`Unknown type ${type}`);
  }
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const firebaseAdapter = {
  async getAllItems(type) {
    try {
      const col = collection(db, collectionNameForType(type));
      const snapshot = await getDocs(col);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Firestore getAllItems error:', err);
      return [];
    }
  },

  async getItem(type, id) {
    try {
      const d = await getDocs(collection(db, collectionNameForType(type)));
      const docData = d.docs.find(x => x.id === id);
      return docData ? { id: docData.id, ...docData.data() } : null;
    } catch (err) {
      console.error('Firestore getItem error:', err);
      return null;
    }
  },

  async addItem(type, itemData) {
    try {
      const id = itemData.id || generateId();
      const item = createItemByType(type, { ...itemData, id, createdAt: new Date().toISOString() });
      await setDoc(doc(db, collectionNameForType(type), id), item);
      return item;
    } catch (err) {
      console.error('Firestore addItem error:', err);
      throw err;
    }
  },

  async updateItem(type, id, updates) {
    try {
      const docRef = doc(db, collectionNameForType(type), id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      const updated = await (await getDocs(collection(db, collectionNameForType(type)))).docs.find(d => d.id === id);
      return updated ? { id: updated.id, ...updated.data() } : null;
    } catch (err) {
      console.error('Firestore updateItem error:', err);
      throw err;
    }
  },

  async deleteItem(type, id) {
    try {
      await deleteDoc(doc(db, collectionNameForType(type), id));
      return true;
    } catch (err) {
      console.error('Firestore deleteItem error:', err);
      throw err;
    }
  },

  async searchItems(type, queryTerm) {
    try {
      // Firestore doesn't offer full-text search natively. This is a naive implementation
      // that fetches all items and filters client-side. For production consider Algolia
      // or Firebase's managed search solutions.
      const all = await this.getAllItems(type);
      const q = queryTerm.toLowerCase();
      return all.filter(item => Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(q)));
    } catch (err) {
      console.error('Firestore searchItems error:', err);
      return [];
    }
  },

  async getItemsByCategory(type, category) {
    try {
      // If your documents store a `category` field you can do a server-side where query.
      const colRef = collection(db, collectionNameForType(type));
      const q = query(colRef, where('category', '==', category));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Firestore getItemsByCategory error:', err);
      return [];
    }
  },

  async getRecentItems(type, limitNum = 10) {
    try {
      const colRef = collection(db, collectionNameForType(type));
      const q = query(colRef, orderBy('createdAt', 'desc'), limit(limitNum));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Firestore getRecentItems error:', err);
      return [];
    }
  }
};

export default firebaseAdapter;
