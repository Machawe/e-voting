import firebase from "firebase/app";

//Import needed firebase modules
import "firebase/auth";
import "firebase/firestore";


 const firebaseConfig = {
		apiKey: "AIzaSyCiEFPwh0tcb1-N68whp_K1LeyIrfh_Wkc",
		authDomain: "csc433-7b9cf.firebaseapp.com",
		projectId: "csc433-7b9cf",
		storageBucket: "csc433-7b9cf.appspot.com",
		messagingSenderId: "830119489149",
		appId: "1:830119489149:web:9f7310ddb0b6cad6c5cb14",
 };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const elections = db.collection("Elections");
const students = db.collection("Students");
const nomenees = db.collection("Nomenees");
const positions = db.collection("Positions");

export { auth, db, elections, students, nomenees, positions };
