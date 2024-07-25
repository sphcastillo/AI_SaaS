import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBIbS9DRh4bq1-CU4ii-dhbJKvg0UkeEZw",
    authDomain: "uploader-of-files.firebaseapp.com",
    projectId: "uploader-of-files",
    storageBucket: "uploader-of-files.appspot.com",
    messagingSenderId: "606796847865",
    appId: "1:606796847865:web:ed6c256c76ea5582cda028"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
