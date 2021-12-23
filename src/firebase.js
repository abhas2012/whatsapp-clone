// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDkRnE-_E0w40sHiUGq6ytioY6DgkcYeGQ",
    authDomain: "whatsapp-clone-f57f1.firebaseapp.com",
    projectId: "whatsapp-clone-f57f1",
    storageBucket: "whatsapp-clone-f57f1.appspot.com",
    messagingSenderId: "18207891606",
    appId: "1:18207891606:web:805dfa8ce84e09b8f962b7",
    measurementId: "G-HDELXSX6V4"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);

export { auth,provider };
export default db;