// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged // Import the onAuthStateChanged function
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration (from your file)
const firebaseConfig = {
    apiKey: "AIzaSyAaJxnKWkXUPlzc0w6aUuAxT72RBPs5gcw",
    authDomain: "big4india-75b92.firebaseapp.com",
    projectId: "big4india-75b92",
    storageBucket: "big4india-75b92.appspot.com", // Corrected the domain
    messagingSenderId: "635435989681",
    appId: "1:635435989681:web:8321bbfae15b6084d18090",
    measurementId: "G-2VB1BRVLKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Provider for Google Sign-In

// --- DOM Elements ---
const loginForm = document.getElementById('login-form');
const googleSignInButton = document.getElementById('google-signin');

// --- REDIRECT IF ALREADY LOGGED IN ---
// This observer checks the user's auth state when the page loads.
// If the user is already logged in, it redirects them to the dashboard.
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('User is already logged in, redirecting to dashboard...');
        // Make sure the current page is not the dashboard to avoid redirect loops
        if (!window.location.pathname.includes('dashboard.html')) {
             window.location.href = '/dashboard.html'; // CHANGE to your dashboard page
        }
    }
});


// --- EMAIL & PASSWORD LOGIN ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User signed in with email:", userCredential.user);
                // Redirect on successful login
                window.location.href = '/dashboard.html'; // CHANGE to your dashboard page
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                alert("Login failed: " + error.message); // Show error to the user
            });
    });
}

// --- GOOGLE SIGN-IN ---
if (googleSignInButton) {
    googleSignInButton.addEventListener('click', () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log("User signed in with Google:", result.user);
                // Redirect on successful login
                window.location.href = '/dashboard.html'; // CHANGE to your dashboard page
            }).catch((error) => {
                console.error("Google Sign-In Error:", error.message);
                alert("Google sign-in failed: " + error.message); // Show error
            });
    });
}
