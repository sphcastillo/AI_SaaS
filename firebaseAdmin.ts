import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as path from 'path';

const serviceKeyPath = path.resolve(__dirname, '../service_key.json');
const serviceKey = require(serviceKeyPath);

let app: App;
 
if(getApps().length === 0){
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb, app as adminApp };