// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, EmailAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaJxnKWkXUPlzc0w6aUuAxT72RBPs5gcw",
  authDomain: "big4india-75b92.firebaseapp.com",
  projectId: "big4india-75b92",
  storageBucket: "big4india-75b92.firebasestorage.app",
  messagingSenderId: "635435989681",
  appId: "1:635435989681:web:8321bbfae15b6084d18090",
  measurementId: "G-2VB1BRVLKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(auth);

var uiConfig = {
  callbacks: {
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'none';
      }
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/public/index.html',
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/plus.login'
      ],
      customParameters: {
        // Forces account selection even when one account is available.
        prompt: 'select_account'
      }
    },
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  // Terms of service url.
  tosUrl: '#',
  // Privacy policy url.
  privacyPolicyUrl: '#'
};

// The start method will wait until the DOM is loaded.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('firebaseui-auth-container');
    if (container) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
} else {
  const container = document.getElementById('firebaseui-auth-container');
  if (container) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}

async function signupUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed in 
    const user = userCredential.user;
    console.log('User signed up:', user);
    return { user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Signup Error:', errorCode, errorMessage);

    // Return a friendly error message
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return { error: 'This email address is already in use.' };
      case 'auth/invalid-email':
        return { error: 'Please enter a valid email address.' };
      case 'auth/weak-password':
        return { error: 'The password is too weak. Please use a stronger password.' };
      default:
        return { error: 'An unknown error occurred. Please try again.' };
    }
  }
}
