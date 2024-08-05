// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADC540jYyNGpIxZr3GhtRXbRWZZKd2FoQ",
  authDomain: "inventory-management-ea474.firebaseapp.com",
  projectId: "inventory-management-ea474",
  storageBucket: "inventory-management-ea474.appspot.com",
  messagingSenderId: "1012894257082",
  appId: "1:1012894257082:web:264aaf509b7450d6749783",
  measurementId: "G-1ZK99675ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}