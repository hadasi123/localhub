// Selector for data service: choose between localStorage implementation and Firestore adapter

import firebaseAdapter from './firebaseAdapter';
import localDataService from './dataService.local';

const useFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';

const dataService = useFirebase ? firebaseAdapter : localDataService;

export default dataService;
