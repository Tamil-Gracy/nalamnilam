import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5yxtn1m0QNn8jjK02LhTPhdAUHy7nVnM",
  authDomain: "nalamnilam-93849.firebaseapp.com",
  projectId: "nalamnilam-93849",
  storageBucket: "nalamnilam-93849.firebasestorage.app",
  messagingSenderId: "173889541267",
  appId: "1:173889541267:web:11413a7b71edf3e47ea966",
  measurementId: "G-Z5ESF9LLCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;