// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh9QGEGD8jxM9gWLW6k0aNck0pLY_AcRg",
  authDomain: "testing-42566.firebaseapp.com",
  projectId: "testing-42566",
  storageBucket: "testing-42566.appspot.com",
  messagingSenderId: "469432293224",
  appId: "1:469432293224:web:6bcf8513519421da5968dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };