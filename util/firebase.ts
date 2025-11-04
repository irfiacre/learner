import { initializeApp } from "firebase/app";


const firebaseConfig = {
  // apiKey: process.env.NEXT_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PROJECT_ID,
  // storageBucket: process.env.NEXT_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_MESSAGE_SENDER_ID,
  // appId: process.env.NEXT_APP_ID
  apiKey: "AIzaSyD25NYGpRGTgkRA7TR_UsyYoW9cp0DhveI",
  authDomain: "learner-af04c.firebaseapp.com",
  projectId: "learner-af04c",
  storageBucket: "learner-af04c.firebasestorage.app",
  messagingSenderId: "921412706145",
  appId: "1:921412706145:web:73f3f78fda2d1880d8ef20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
