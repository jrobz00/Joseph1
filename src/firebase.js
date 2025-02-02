// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-y-5H-vJfs7TQAFoYQeNOCu4OZKCcsvc",
  authDomain: "joseph-robinson-8b670.firebaseapp.com",
  projectId: "joseph-robinson-8b670",
  storageBucket: "joseph-robinson-8b670.firebasestorage.app",
  messagingSenderId: "241886989989",
  appId: "1:241886989989:web:926fb30dee1b5bb35e074c",
  measurementId: "G-8Q61YM8DSK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
