import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAFioi_2avGxAqpYRQ3kxRxc_NP89p9HsU",
  authDomain: "conquer-bf795.firebaseapp.com",
  projectId: "conquer-bf795",
  storageBucket: "conquer-bf795.firebasestorage.app",
  messagingSenderId: "342333591605",
  appId: "1:342333591605:web:5a5b0d4c49716aece7a17c",
  measurementId: "G-MYZP2F0G53"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
