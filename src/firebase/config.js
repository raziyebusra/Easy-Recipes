import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD30BKJ5L0cnetg-OIaGS_H2VZAGhB-zK8",
  authDomain: "recipes-65ba1.firebaseapp.com",
  projectId: "recipes-65ba1",
  storageBucket: "recipes-65ba1.appspot.com",
  messagingSenderId: "184009663550",
  appId: "1:184009663550:web:7f189b9b9f828b32fd1d6f"
};

// initialize firebase
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()

export { db }