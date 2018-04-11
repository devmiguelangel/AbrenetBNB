import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBM_oYcj7N9xanchA96Zc-kiKCN1hrgBHQ",
  authDomain: "abrenetbnb.firebaseapp.com",
  databaseURL: "https://abrenetbnb.firebaseio.com",
  projectId: "abrenetbnb",
  storageBucket: "",
  messagingSenderId: "350522286544"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();