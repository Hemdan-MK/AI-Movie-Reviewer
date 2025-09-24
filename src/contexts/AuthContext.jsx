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
          console.log('🔐 Initializing Google Identity Services...');
          console.log('Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
          console.log('Current origin:', window.location.origin);
          console.log('Development environment:', isDevelopment);
          
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          });
          
          console.log('✅ Google Identity Services initialized successfully');
          
          // Only try One Tap in production or secure contexts
          if (!isDevelopment) {
            console.log('🎯 Production environment detected - enabling One Tap');
            setIsOneTapAvailable(true);
            // Show One Tap prompt automatically in production
            setTimeout(showOneTap, 1000);
          } else {
            console.log('🔧 Development environment detected - One Tap may be restricted');
            console.log('💡 Use the Sign-In button for development, One Tap will work in production');
            setIsOneTapAvailable(false);
          }
        } catch (error) {
          console.error('❌ Error initializing Google Identity Services:', error);
          setIsOneTapAvailable(false);
        }
      } else {
        if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
          console.warn('⚠️ VITE_GOOGLE_CLIENT_ID not found in environment variables');
        }
        if (!window.google) {
          console.warn('⚠️ Google Identity Services script not loaded');
        }
      }
    };

    // Check if Google Identity Services is loaded
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      console.log('⏳ Waiting for Google Identity Services to load...');
      // Wait for the script to load
      const checkGoogleLoaded = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn();
          clearInterval(checkGoogleLoaded);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleLoaded);
        if (!window.google) {
          console.error('❌ Google Identity Services failed to load after 10 seconds');
        }
      }, 10000);
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      console.log('🔐 Received Google credential response');
      
      // Create a Google credential with the token
      const credential = GoogleAuthProvider.credential(response.credential);
      
      // Sign in with the credential
      await signInWithCredential(auth, credential);
      
      console.log('✅ Successfully signed in with Google');
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
      console.log('🎯 Attempting to show Google One Tap...');
      try {
        window.google.accounts.id.prompt((notification) => {
          console.log('One Tap notification:', notification);
          if (notification.isNotDisplayed()) {
            const reason = notification.getNotDisplayedReason();
            console.log('❌ One Tap not displayed:', reason);
            if (reason === 'browser_not_supported' || reason === 'invalid_client' || reason === 'unregistered_origin') {
              console.log('💡 This is likely due to localhost restrictions or origin issues');
              setIsOneTapAvailable(false);
            }
          } else if (notification.isSkippedMoment()) {
            console.log('⏭️ One Tap skipped:', notification.getSkippedReason());
          } else if (notification.isDismissedMoment()) {
            console.log('👋 One Tap dismissed:', notification.getDismissedReason());
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
