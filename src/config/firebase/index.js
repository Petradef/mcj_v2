import firebase from "firebase/app"
import "firebase/auth"
// import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDtdvT9zFOSdhWFJWOCaWMCn2mZPMuXhwQ",
    authDomain: "mcj-cs.firebaseapp.com",
    databaseURL: "https://mcj-cs.firebaseio.com",
    projectId: "mcj-cs",
    storageBucket: "mcj-cs.appspot.com",
    messagingSenderId: "620375602474",
    appId: "1:620375602474:web:f5bc111508a9f600621a53"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;