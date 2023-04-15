// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC1cj77njnvYv21RDS2NWw2B1YNZnW4HEs",
	authDomain: "dashboard-cef6e.firebaseapp.com",
	projectId: "dashboard-cef6e",
	storageBucket: "dashboard-cef6e.appspot.com",
	messagingSenderId: "343759308758",
	appId: "1:343759308758:web:1125ef86f3045af4ff0677",
	measurementId: "G-4J4FR6WHQF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to Firestore database
var db = firebase.firestore();
