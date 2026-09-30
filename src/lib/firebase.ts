
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXpXIqnB2zjmiqZ9V-27jl5w74qOFem-M",
  authDomain: "agriconnect-eda20.firebaseapp.com",
  projectId: "agriconnect-eda20",
  storageBucket: "agriconnect-eda20.firebasestorage.app",
  messagingSenderId: "164816587050",
  appId: "1:164816587050:web:a98bb6d96a148b5f3b3653",
  measurementId: "G-V9HVGD0BM0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
