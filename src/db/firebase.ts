// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const API_KEY = import.meta.env.VITE_API_KEY_FIRE
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const STORAGED_BUCKET = import.meta.env.VITE_STORAGED_BUCKET
const MESSAGINF_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_APP_ID
const MEASUREMENT_DI = import.meta.env.VITE_MEASUREMENT_ID
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGED_BUCKET,
  messagingSenderId: MESSAGINF_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_DI
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



