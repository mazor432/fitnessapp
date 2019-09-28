import * as firebase from 'firebase';

import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBXLblNw54Y6Y0YnMediLB6_qai-HqMJ5I",
    authDomain: "react-my-training.firebaseapp.com",
    databaseURL: "https://react-my-training.firebaseio.com",
    projectId: "react-my-training",
    storageBucket: "",
    messagingSenderId: "235558073515",
    appId: "1:235558073515:web:fbbcde2f3a3bb8074ab3ee"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseExercises = firebaseDB.ref('exercises_list');

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();



export {
    firebase,
    firebaseDB,
    firebaseExercises,
    googleAuthProvider
}