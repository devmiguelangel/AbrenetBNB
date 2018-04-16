import * as firebase from "firebase";
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyB5d97T2oaqzQVL2YIlEtK9cCNfCLCoB9g",
  authDomain: "seguros-bnb.firebaseapp.com",
  databaseURL: "https://seguros-bnb.firebaseio.com",
  projectId: "seguros-bnb",
  storageBucket: "",
  messagingSenderId: "538941338608"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const db = firebase.firestore();