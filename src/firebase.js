import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDWt3PBNbKQ0rwpRiVg5gdW1dBZrvybyGs",
    authDomain: "teste-usabilidade-fb.firebaseapp.com",
    projectId: "teste-usabilidade-fb",
    storageBucket: "teste-usabilidade-fb.firebasestorage.app",
    messagingSenderId: "195204091544",
    appId: "1:195204091544:web:efe9af372e868ec7b00aed"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };