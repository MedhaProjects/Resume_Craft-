import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_Firebase_KEY,
    authDomain: "resumecraft-5394b.firebaseapp.com",
    projectId: "resumecraft-5394b",
    storageBucket: "resumecraft-5394b.firebasestorage.app",
    messagingSenderId: "807329830358",
    appId: "1:807329830358:web:cfc324471211c98032c077",
    measurementId: "G-9PYZGRV8FN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
