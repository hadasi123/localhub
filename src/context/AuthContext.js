// Auth Context & Provider - handles Firebase auth state and an on-demand auth prompt

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import googleIcon from '../assets/icons/feature-icons/google.svg';
import facebookIcon from '../assets/icons/feature-icons/facebook.svg';
import anonymousIcon from '../assets/icons/feature-icons/anonymous.svg';
import { auth } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInAnonymously,
  signOut
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promptOpen, setPromptOpen] = useState(false);
  const pendingResolver = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const doGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  };

  const doFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  };

  const doAnonymous = async () => {
    const cred = await signInAnonymously(auth);
    return cred.user;
  };

  const ensureAuthenticated = () => {
    if (auth.currentUser) return Promise.resolve(auth.currentUser);
    setPromptOpen(true);
    return new Promise((resolve, reject) => {
      pendingResolver.current = { resolve, reject };
    });
  };

  const handleSignedIn = (u) => {
    setPromptOpen(false);
    if (pendingResolver.current) {
      pendingResolver.current.resolve(u);
      pendingResolver.current = null;
    }
  };

  const handleCancel = () => {
    setPromptOpen(false);
    if (pendingResolver.current) {
      pendingResolver.current.reject(new Error('AUTH_CANCELLED'));
      pendingResolver.current = null;
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    signOut: () => signOut(auth),
    signInWithGoogle: async () => handleSignedIn(await doGoogle()),
    signInWithFacebook: async () => handleSignedIn(await doFacebook()),
    signInAnonymously: async () => handleSignedIn(await doAnonymous()),
    ensureAuthenticated,
    promptOpen,
    setPromptOpen,
    handleCancel
  }), [user, loading, promptOpen]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {promptOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
          <div className="card" style={{ maxWidth: 420, width: '90%', padding: '16px' }}>
            <h3 className="card-title" style={{ textAlign: 'center', marginBottom: 12 }}>התחברות</h3>
            <p className="text-sm" style={{ textAlign: 'center', marginBottom: 16 }}>
              יש להתחבר על מנת לפרסם או לערוך פריטים
            </p>
            <div className="grid grid-cols-1 gap-md" style={{ display: 'grid', gap: '12px' }}>
              <button className="btn btn-outline" onClick={value.signInWithGoogle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row-reverse' }}>
                  <span>התחברות עם Google</span>
                  <img src={googleIcon} alt="" style={{ width: 21, height: 21 }} />
                  
                </span>
              </button>
              <button className="btn btn-outline" onClick={value.signInWithFacebook}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexDirection: 'row-reverse' }}>
                  <span>התחברות עם Facebook</span>
                  <img src={facebookIcon} alt="" style={{ width: 24, height: 24 }} />
                  
                </span>
              </button>
              <button className="btn btn-outline" onClick={value.signInAnonymously}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexDirection: 'row-reverse' }}>
                  <span>התחברות אנונימית</span>
                  <img src={anonymousIcon} alt="" style={{ width: 22, height: 22 }} />
                  
                </span>
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
