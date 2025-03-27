// This file is used to initialize Firebase with the configuration details of the project.
import { initializeApp, getReactNativePersistence } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt3IbS062aN2jfyyjCna5q9v1eIIfOdI4",
  authDomain: "folketinget-d24a1.firebaseapp.com",
  projectId: "folketinget-d24a1",
  storageBucket: "folketinget-d24a1.firebasestorage.app",
  messagingSenderId: "641004282795",
  appId: "1:641004282795:web:50a4d3a77025777556a8ee",
  measurementId: "G-RVWDY6626S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
