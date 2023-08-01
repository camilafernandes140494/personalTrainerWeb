// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrM6fFBOzQcO_cHWWm4WPk86Us-j36i0M",
  authDomain: "personalgustavofernandes-f0dd5.firebaseapp.com",
  databaseURL: "https://personalgustavofernandes-f0dd5-default-rtdb.firebaseio.com",
  projectId: "personalgustavofernandes-f0dd5",
  storageBucket: "personalgustavofernandes-f0dd5.appspot.com",
  messagingSenderId: "899632582019",
  appId: "1:899632582019:web:3c6e038da59e17595a7ab6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
export default auth;
