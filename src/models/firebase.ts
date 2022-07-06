import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBTzZauo6vDvN4Jtgqh_RkhH4bqWSdo9g",
  authDomain: "invisoo.firebaseapp.com",
  projectId: "invisoo",
  storageBucket: "invisoo.appspot.com",
  messagingSenderId: "772139596025",
  appId: "1:772139596025:web:4370dff3d1c22ded28ca28",
  measurementId: "G-MD04C0QY6L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
