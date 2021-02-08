import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAnzZ-O8i3-nm7hFhuzIBUxd4o4mzTMrj0",
  authDomain: "myemployees-78909.firebaseapp.com",
  databaseURL: "https://myemployees-78909.firebaseio.com",
  projectId: "myemployees-78909",
  storageBucket: "myemployees-78909.appspot.com",
  messagingSenderId: "954665765413",
  appId: "1:954665765413:web:38118bf7aa4ea9a46d0dcc",
};
// Initialize Firebase
const appFireBase = firebase.initializeApp(firebaseConfig);
export default appFireBase;
