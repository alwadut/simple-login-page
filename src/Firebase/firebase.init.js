// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmFT-OxlZZvUu438L1FIJJiL-snDFVGj4",
  authDomain: "email-pass-2d5c5.firebaseapp.com",
  projectId: "email-pass-2d5c5",
  storageBucket: "email-pass-2d5c5.firebasestorage.app",
  messagingSenderId: "527949835157",
  appId: "1:527949835157:web:f2e45aee27003384b3249c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);