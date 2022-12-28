
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Import the functions you need from the SDKs you need


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};
console.log(firebaseConfig.appId)
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)