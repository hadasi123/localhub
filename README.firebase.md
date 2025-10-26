Firebase integration setup

1) Install Firebase SDK

   npm install firebase

or with yarn

   yarn add firebase

2) Provide Firebase config

Copy `.env.local.example` to `.env.local` and fill in the keys from your Firebase project settings (found in the Firebase Console -> Project settings -> Your apps -> Config).

Example `.env.local` (DO NOT commit):

REACT_APP_FIREBASE_API_KEY=AIza...yourkey...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abcdef012345

3) How to use in code

We added `src/services/firebase.js` which exports `db` and `storage`:

import { db, storage } from '../services/firebase';

For data operations you can use the provided Firestore adapter at `src/services/firebaseAdapter.js`. It implements the same method names as the existing `dataService` (~getAllItems, addItem, updateItem, deleteItem, searchItems, getItemsByCategory, getRecentItems) so you can switch your data layer easily.

Example: (temporary)

import firebaseAdapter from './services/firebaseAdapter';

// fetch lost & found items
const items = await firebaseAdapter.getAllItems('lost-and-found');

4) Switching data providers

Currently `src/services/dataService.js` is a localStorage-backed service. To switch the app to Firestore:

- Option A (manual): Replace imports where the project uses `dataService` to use `firebaseAdapter` instead.
- Option B (minimal change): Replace the default export in `src/services/dataService.js` with `firebaseAdapter` (not recommended unless you keep a backup).

If you want, I can prepare a patch to switch `dataService` to the adapter and add a small feature flag.

5) Notes & caveats

- Firestore pricing & rules: configure security rules and consider indexing requirements for larger queries.
- Search: Firestore doesn't provide full-text search — consider using a dedicated search service for production.
- Storage: if you want to upload files (images), use `storage` from `src/services/firebase.js` and `uploadBytes`, `getDownloadURL` from 'firebase/storage'.

If you'd like, I can:
- Patch `dataService` to optionally delegate to `firebaseAdapter` via a flag.
- Implement upload/download helpers for `storage` and wire the lost-and-found form to support an optional image upload.
