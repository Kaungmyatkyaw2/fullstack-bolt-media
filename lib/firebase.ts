import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9x7ok66NnYIWBhzsedUZtaD5rh742m2c",
  authDomain: "bolt-88b73.firebaseapp.com",
  projectId: "bolt-88b73",
  storageBucket: "bolt-88b73.appspot.com",
  messagingSenderId: "1029704518788",
  appId: "1:1029704518788:web:2db672c0148e288be2c6d1",
  measurementId: "G-J1KVJCGGF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
