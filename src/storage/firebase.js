import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_STORAGE_BUCKET,
  FB_SENDER_ID,
  FB_APP_ID,
} from "../../config";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: "react-native-guidance-app",
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_SENDER_ID,
  appId: FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;
