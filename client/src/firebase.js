import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: "my-broker1.firebaseapp.com",
  projectId: "my-broker1",
  storageBucket: "my-broker1.appspot.com",
  messagingSenderId: "508140611855",
  appId: "1:508140611855:web:e49d1611f8f2fc78a9367a",
  measurementId: "G-N8ED2HHJNC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
