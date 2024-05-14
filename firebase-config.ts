// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZdP9HMZWiiMu-wagVyrTQbHvmZdaO-lk",
  authDomain: "forum-ute.firebaseapp.com",
  projectId: "forum-ute",
  storageBucket: "forum-ute.appspot.com",
  messagingSenderId: "269488421252",
  appId: "1:269488421252:web:73e1a36d17aef104e8c5d1",
  measurementId: "G-YECLLTKSSQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage()
