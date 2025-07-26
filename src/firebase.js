// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCFyJljX46VqyP2Z7XpjwdI82ZboXXIEOg",
// //   authDomain: "expreane-3d8c3.firebaseapp.com",
// //   projectId: "expreane-3d8c3",
// //   storageBucket: "expreane-3d8c3.firebasestorage.app",
// //   messagingSenderId: "576143187584",
// //   appId: "1:576143187584:web:9c6a54205888a560a7d065",
// //   measurementId: "G-2RY3PJL6SK"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCFyJljX46VqyP2Z7XpjwdI82ZboXXIEOg",
//   authDomain: "expreane-3d8c3.firebaseapp.com",
//   projectId: "expreane-3d8c3",
//   storageBucket: "expreane-3d8c3.firebasestorage.app",
//   messagingSenderId: "576143187584",
//   appId: "1:576143187584:web:9c6a54205888a560a7d065",
//   measurementId: "G-2RY3PJL6SK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const analytics = getAnalytics(app);

// export default app;

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;