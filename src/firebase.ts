import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your actual Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBWI52maq3QfBT4hjin-mBzuH7TBuQrkyU",
    authDomain: "washmarket-3d81a.firebaseapp.com",
    databaseURL: "https://washmarket-3d81a-default-rtdb.firebaseio.com",
    projectId: "washmarket-3d81a",
    storageBucket: "washmarket-3d81a.firebasestorage.app",
    messagingSenderId: "989360349383",
    appId: "1:989360349383:web:8b35a4ca651e152e88dee2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
