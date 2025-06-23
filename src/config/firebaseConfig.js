// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdlVeeyg4IJYyPLgyPJLoQY-e88lB8YhQ",
  authDomain: "localeno-ca7cf.firebaseapp.com",
  projectId: "localeno-ca7cf",
  storageBucket: "localeno-ca7cf.firebasestorage.app",
  messagingSenderId: "611772021798",
  appId: "1:611772021798:web:dac554197986e0a0ca7ae7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { app, db,auth,googleProvider };