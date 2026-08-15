// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK7DX5K0tZBvvt3C50rQwRBw0UEVGweW4",
  authDomain: "sobuni-d56fe.firebaseapp.com",
  projectId: "sobuni-d56fe",
  storageBucket: "sobuni-d56fe.firebasestorage.app",
  messagingSenderId: "900488397912",
  appId: "1:900488397912:web:b1b440172168779374b62d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;