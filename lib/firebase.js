import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "clicker-6bf63.firebaseapp.com",
  projectId: "clicker-6bf63",
  storageBucket: "clicker-6bf63.firebasestorage.app",
  messagingSenderId: "421404728759",
  appId: "1:421404728759:web:e4b5f6c8d5a0d483e01c32",
  measurementId: "G-X77DM5N9VS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
