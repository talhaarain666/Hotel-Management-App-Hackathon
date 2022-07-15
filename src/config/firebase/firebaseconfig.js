// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5MKFugy-G1xaMQ93Doev-33L27Bw8T1w",
  authDomain: "hotel-management-app-hackathon.firebaseapp.com",
  projectId: "hotel-management-app-hackathon",
  storageBucket: "hotel-management-app-hackathon.appspot.com",
  messagingSenderId: "832252039085",
  appId: "1:832252039085:web:58a318864f56d9f9239b24",
  measurementId: "G-K6JHCHDNP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;