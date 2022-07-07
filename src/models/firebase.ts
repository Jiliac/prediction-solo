import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTmgjwLWj2WUjZv8acUrkUtvCsTJ8CYno",
  authDomain: "prediction-b6c14.firebaseapp.com",
  projectId: "prediction-b6c14",
  storageBucket: "prediction-b6c14.appspot.com",
  messagingSenderId: "245322398837",
  appId: "1:245322398837:web:b8cf10cd01ad35b1318c3c",
  measurementId: "G-8NQ91HD2YY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv && nodeEnv === "development")
  connectFirestoreEmulator(db, "localhost", 8888);
