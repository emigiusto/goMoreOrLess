import firebase from "firebase/app"

import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDq9bYq4gD2LC-9ZOynDkUJzPBB1bHEcsY",
    authDomain: "gomore-b1db1.firebaseapp.com",
    projectId: "gomore-b1db1",
    storageBucket: "gomore-b1db1.appspot.com",
    messagingSenderId: "507070323124",
    appId: "1:507070323124:web:d71409febd41768fbf7ae1",
    measurementId: "G-887P9DVHX9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;