// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from "dotenv"

dotenv.config()
const API_KEY = process.env.API_KEY_FIRE
const AUTH_DOMAIN = process.env.AUTH_DOMAIN
const PROJECT_ID = process.env.PROJECT_ID
const STORAGED_BUCKET = process.env.STORAGED_BUCKET
const MESSAGINF_SENDER_ID = process.env.MESSAGINF_SENDER_ID
const APP_ID = process.env.APP_ID
const MEASUREMENT_DI = process.env.MEASUREMENT_DI
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
