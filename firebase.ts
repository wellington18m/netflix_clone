// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD2omPb7YfIIai6QyTUDzCd1zb3ooy1bw",
  authDomain: "cloneprojects-9a66b.firebaseapp.com",
  projectId: "cloneprojects-9a66b",
  storageBucket: "cloneprojects-9a66b.appspot.com",
  messagingSenderId: "583275696036",
  appId: "1:583275696036:web:0283648f5258f091ed3b31"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app
export {auth, db}