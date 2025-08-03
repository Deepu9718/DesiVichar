// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDEhC2_5n5W2drluh91SVVV1Ei0C8BTwck",
  authDomain: "desivichar-81e16.firebaseapp.com",
  projectId: "desivichar-81e16",
  storageBucket: "desivichar-81e16.firebasestorage.app",
  messagingSenderId: "5119223613",
  appId: "1:5119223613:web:c04cceaa7f94a1dfa74754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export all required items
export { auth, db, RecaptchaVerifier, signInWithPhoneNumber, storage };