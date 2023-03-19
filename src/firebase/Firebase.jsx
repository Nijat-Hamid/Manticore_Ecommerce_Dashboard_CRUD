import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_api_key,
  authDomain: import.meta.env.VITE_APP_api_auth,
  projectId: import.meta.env.VITE_APP_api_projectId,
  storageBucket: import.meta.env.VITE_APP_api_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_api_messagingSenderId,
  appId: import.meta.env.VITE_APP_api_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
