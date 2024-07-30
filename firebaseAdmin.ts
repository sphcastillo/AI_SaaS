import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
// const serviceKey = require('./service_key.json');

const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
let app: App;
 
if(getApps().length === 0){
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { adminDb, app as adminApp, adminStorage };