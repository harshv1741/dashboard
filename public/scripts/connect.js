// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCYpaDTRnXlY2EqbKytQ5xqrJV_s0mgji4",
	authDomain: "dashboard-90efc.firebaseapp.com",
	projectId: "dashboard-90efc",
	storageBucket: "dashboard-90efc.appspot.com",
	messagingSenderId: "621434556342",
	appId: "1:621434556342:web:d702fcb1aeecad82f6fb17",
	measurementId: "G-YQ7WT8581Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
