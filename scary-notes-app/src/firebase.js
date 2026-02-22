// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider } from "firebase/auth";


// Tänne tulee Firebase config seuraavassa vaiheessa
const firebaseConfig = {
  apiKey: "AIzaSyDDX8LtkKAlS_VQ6bfXrvfHStwPumJT3F0",
  authDomain: "scary-notes-sync.firebaseapp.com",
  projectId: "scary-notes-sync",
  storageBucket: "scary-notes-sync.firebasestorage.app",
  messagingSenderId: "964875773176",
  appId: "1:964875773176:web:8c126cd1de2622d33a470d",
  measurementId: "G-XC7ERYMSF1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();