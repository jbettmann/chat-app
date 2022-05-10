import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFQgCjWaTEk0crS4YDykDmovtymRa37II",
  authDomain: "chat-app-2-350db.firebaseapp.com",
  projectId: "chat-app-2-350db",
  storageBucket: "chat-app-2-350db.appspot.com",
  messagingSenderId: "24917673340",
  appId: "1:24917673340:web:c00e4d3a4de7fe70ec50f9",
  measurementId: "G-WKJSBLK77J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const storage = getStorage(app)
