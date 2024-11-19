// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW4qumOpqvavTit6bWumXbUwsXFuNFkd4",
  authDomain: "chatting-app-8c6a3.firebaseapp.com",
  projectId: "chatting-app-8c6a3",
  storageBucket: "chatting-app-8c6a3.firebasestorage.app",
  messagingSenderId: "450069525659",
  appId: "1:450069525659:web:b3e1dc332962aa493b423e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app