import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDcxiiUqtcipYO381g2nnKBFoDB4CJzQPc",
    authDomain: "havenly-2c71f.firebaseapp.com",
    projectId: "havenly-2c71f",
    storageBucket: "havenly-2c71f.firebasestorage.app",
    messagingSenderId: "938801961376",
    appId: "1:938801961376:web:2b133c31b614220c346cc5"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db, firebaseApp };
