import firebase from "firebase/compat/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
// 인증정보!
  apiKey: "AIzaSyDNTq951tW_7GVLcESpGE7Coy49rlutNcA",
  authDomain: "mini-65fab.firebaseapp.com",
  projectId: "mini-65fab",
  storageBucket: "mini-65fab.appspot.com",
  messagingSenderId: "961709076073",
  appId: "1:961709076073:web:8feb2b5014a2a2d1bffcf8",
  measurementId: "G-2Y7RRWRXVJ"
};

firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// export { auth };
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;