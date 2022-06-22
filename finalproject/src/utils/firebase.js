import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyChT5G8jSWeck8Y1NP89-s1zCKSLEQqWCE",
  authDomain: "ouoproject.firebaseapp.com",
  projectId: "ouoproject",
  storageBucket: "ouoproject.appspot.com",
  messagingSenderId: "599721744408",
  appId: "1:599721744408:web:ec619199ff5021d4ec0b6d"
};

firebase.initializeApp(firebaseConfig);

export default firebase;