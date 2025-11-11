// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT27CRBFmyr3oVTjDPKl8WjX2s5AT_2tc",
  authDomain: "netflix-with-chatgpt.firebaseapp.com",
  projectId: "netflix-with-chatgpt",
  storageBucket: "netflix-with-chatgpt.appspot.com",
  messagingSenderId: "880879566243",
  appId: "1:880879566243:web:27cc72adf3d60c3f8aee16",
  measurementId: "G-XDDF0P90S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();