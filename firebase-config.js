// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdZ3Ef6_Mk2aRea4yE-ms2DBmM_Pm0b_g",
  authDomain: "skillshare-611bc.firebaseapp.com",
  projectId: "skillshare-611bc",
  storageBucket: "skillshare-611bc.appspot.com",
  messagingSenderId: "258104126669",
  appId: "1:258104126669:web:42116a7bb95e9b9dd08d84",
  measurementId: "G-6F81GFE0QY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const projectsRef = collection(db, "projects");
export const skillsRef = collection(db, "skills");