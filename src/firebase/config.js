import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "aashg-5ba78.firebaseapp.com",
  projectId: "aashg-5ba78",
  storageBucket: "aashg-5ba78.appspot.com",
  messagingSenderId: "166560289442",
  appId: "1:166560289442:web:f21ebf3321157ae4f7bdfb",
  measurementId: "G-JT4YMN5DRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export default app;