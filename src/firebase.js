import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBN63MiGsy70RqRqUNnqhX-Egpu2XYXd3E",
    authDomain: "instagram-clone-react-f76c5.firebaseapp.com",
    databaseURL:
        "https://instagram-clone-react-f76c5-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-f76c5",
    storageBucket: "instagram-clone-react-f76c5.appspot.com",
    messagingSenderId: "965876683722",
    appId: "1:965876683722:web:87c66b334a611e5207b533",
    measurementId: "G-7EX32TDBJF",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
