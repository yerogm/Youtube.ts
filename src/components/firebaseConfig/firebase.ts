// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBRynyvbS7CfgpessG2YhIEOJzWIgPxxs",
  authDomain: "typescript-f8f3e.firebaseapp.com",
  projectId: "typescript-f8f3e",
  storageBucket: "typescript-f8f3e.appspot.com",
  messagingSenderId: "307552678787",
  appId: "1:307552678787:web:ad0d7f3bccfac5fae8fcb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)