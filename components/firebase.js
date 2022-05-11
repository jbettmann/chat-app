import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, deleteObject, ref } from 'firebase/storage';

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
// Connects Storage to db
export const storage = getStorage(app)

// deletes Storage images when "delete storage" is a message ***Does not work
export const deleteStorage = () => {
  const desertRef = ref(storage, 'images/');

  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log('File deleted successfully')
  }).catch((error) => {
    console.log("No go:", error)
  });
}