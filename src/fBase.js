import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDZiXzSSDNTbcemM1rNMiDp3j3tpgwqpWw",
  authDomain: "nwitter-65ff6.firebaseapp.com",
  databaseURL: "https://nwitter-65ff6.firebaseio.com",
  projectId: "nwitter-65ff6",
  storageBucket: "nwitter-65ff6.appspot.com",
  messagingSenderId: "539230940620",
  appId: "1:539230940620:web:28aa01c09334a646614169"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();