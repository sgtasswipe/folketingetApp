// This file is used to initialize Firebase with the configuration details of the project.
import { initializeApp, getReactNativePersistence } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADF_yqmTroL3NHL_46lvGnLjvlr58ZuEQ",
  authDomain: "folketinget-f02cf.firebaseapp.com",
  projectId: "folketinget-f02cf",
  storageBucket: "folketinget-f02cf.firebasestorage.app",
  messagingSenderId: "32583519355",
  appId: "1:32583519355:web:b69ea1f3005d846277e6de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
