import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAp2WIX9SqThkxGIQ9lR3GcaykbdPDVbWc",
    authDomain: "clone-5a41b.firebaseapp.com",
    projectId: "clone-5a41b",
    storageBucket: "clone-5a41b.appspot.com",
    messagingSenderId: "776328071116",
    appId: "1:776328071116:web:3bdfb1a753c5eca5c6ff69"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export {db, provider, auth};