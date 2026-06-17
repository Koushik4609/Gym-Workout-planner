import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      return updateProfile(cred.user, { displayName });
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setIsDemo(false);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function demoLogin() {
    setIsDemo(true);
    setCurrentUser({
      uid: 'demo-user-001',
      email: 'demo@fitforge.ai',
      displayName: 'Alex Johnson',
      photoURL: null,
      isDemo: true
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isDemo) {
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [isDemo]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    googleLogin,
    demoLogin,
    isDemo,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
