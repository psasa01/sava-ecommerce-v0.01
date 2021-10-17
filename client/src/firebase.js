import firebase from "firebase/app";
// import 'firebase/firestore';
import "firebase/auth";
// import { firebaseConfig } from './config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMqJ11NT0pLLWkq7mjiEZKFZSwCMDug3g",
  authDomain: "react-redux-ecommerce-5b06d.firebaseapp.com",
  projectId: "react-redux-ecommerce-5b06d",
  storageBucket: "react-redux-ecommerce-5b06d.appspot.com",
  messagingSenderId: "853893671142",
  appId: "1:853893671142:web:dbbd069daeabcf5a817327",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
