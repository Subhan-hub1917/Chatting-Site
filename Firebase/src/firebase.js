
import { initializeApp } from "firebase/app";
// import  {collection, getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDJtWFHSev4jAmk9KD-mAXsGaz-xjVCjMo",
  authDomain: "contactfirbase.firebaseapp.com",
  databaseURL: "https://contactfirbase-default-rtdb.firebaseio.com",
  projectId: "contactfirbase",
  storageBucket: "contactfirbase.appspot.com",
  messagingSenderId: "27996707234",
  appId: "1:27996707234:web:9c215ca8ed9cbd3223fafb"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const provider=new GoogleAuthProvider();
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app)