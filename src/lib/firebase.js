import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB5fGXxawo0Sm6dlbCa-M0AiMD_rEFS0Rg',
  authDomain: 'instagram-c2508.firebaseapp.com',
  databaseURL: 'https://instagram-c2508-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'instagram-c2508',
  storageBucket: 'instagram-c2508.appspot.com',
  messagingSenderId: '76095349521',
  appId: '1:76095349521:web:4a56c2e4883765708d62b0'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
