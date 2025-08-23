
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "agriconnect-mjdns",
  appId: "1:529419671401:web:2ea3e0b362d2371aac4ff8",
  storageBucket: "agriconnect-mjdns.firebasestorage.app",
  apiKey: "AIzaSyCwEJsYVBz2wHNrRnVL0-6Dsu5D_jw0x8E",
  authDomain: "agriconnect-mjdns.firebaseapp.com",
  messagingSenderId: "529419671401",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
