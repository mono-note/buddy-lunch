
import firebase from 'firebase'
// Initialize Firebase
let config = {
  apiKey: "AIzaSyAkqoBFFDpNzVK4X5y6RZGQhrkkRRF9NBk",
  authDomain: "buddylunch-85ac6.firebaseapp.com",
  databaseURL: "https://buddylunch-85ac6.firebaseio.com",
  projectId: "buddylunch-85ac6",
  storageBucket: "buddylunch-85ac6.appspot.com",
  messagingSenderId: "607104721437"
};

firebase.initializeApp(config);
let fireDatabase = firebase.database();
export default fireDatabase;