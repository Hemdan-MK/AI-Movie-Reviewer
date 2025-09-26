import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithCredential,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOneTapAvailable, setIsOneTapAvailable] = useState(false);

  // Check if we're in a development environment
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' || 
                       window.location.protocol === 'http:';

  // Initialize Google Identity Services
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        try {
          
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          });
          if (!isDevelopment) {
            setIsOneTapAvailable(true);
            setTimeout(showOneTap, 1000);
          } else {
            setIsOneTapAvailable(false);
          }
        } catch (error) {
          console.error('❌ Error initializing Google Identity Services:', error);
          setIsOneTapAvailable(false);
        }
      } else {
      }
    };

    // Check if Google Identity Services is loaded
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      const checkGoogleLoaded = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn();
          clearInterval(checkGoogleLoaded);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkGoogleLoaded);
      }, 10000);
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const credential = GoogleAuthProvider.credential(response.credential);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.error('❌ Error signing in with Google:', error);
      
      // Provide specific error messages for common issues
      if (error.code === 'auth/invalid-credential') {
        console.error('🚨 FIREBASE PROJECT MISMATCH:');
        console.error('   Your Google Client ID doesn\'t match your Firebase project.');
        console.error('   Current Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
        console.error('   Firebase Project Number:', error.message.match(/project_number: (\d+)/)?.[1] || 'unknown');
        console.error('');
        console.error('💡 SOLUTIONS:');
        console.error('   1. Get the correct Client ID from Firebase Console → Authentication → Sign-in method → Google');
        console.error('   2. OR update your Google Cloud project to match your Firebase project');
        console.error('');
      } else if (error.code === 'auth/operation-not-allowed') {
        console.error('🚨 GOOGLE SIGN-IN NOT ENABLED:');
        console.error('   Enable Google sign-in in Firebase Console → Authentication → Sign-in method');
      } else {
        console.error('🚨 UNKNOWN AUTH ERROR:', error.code);
      }
    }
  };

  const showOneTap = () => {
    if (window.google && !currentUser) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            const reason = notification.getNotDisplayedReason();
            if (reason === 'browser_not_supported' || reason === 'invalid_client' || reason === 'unregistered_origin') {
              setIsOneTapAvailable(false);
            }
          }
        });
      } catch (error) {
        console.error('❌ Error showing One Tap:', error);
        setIsOneTapAvailable(false);
      }
    }
  };

  const signInWithGoogle = () => {
    showOneTap();
  };

  const renderGoogleSignInButton = (element, options = {}) => {
    if (window.google && element) {
      window.google.accounts.id.renderButton(element, {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        logo_alignment: 'left',
        ...options
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    showOneTap,
    renderGoogleSignInButton,
    isOneTapAvailable,
    isDevelopment,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
