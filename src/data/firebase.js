import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOeSrOyZR3CHjYPVVfWq9fgOA0QvsQdwo",
  authDomain: "clontagrame2.firebaseapp.com",
  projectId: "clontagrame2",
  storageBucket: "clontagrame2.appspot.com",
  messagingSenderId: "383137529194",
  appId: "1:383137529194:web:c0d04f79e11df559c17913"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
