import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAkba_Mcp1d6-ibuMjLQ6pww4tZ2CS-mnw",
    authDomain: "chat-app-tvk-37836.firebaseapp.com",
    databaseURL: "https://chat-app-tvk-37836.firebaseio.com",
    projectId: "chat-app-tvk-37836",
    storageBucket: "chat-app-tvk-37836.appspot.com",
    messagingSenderId: "713199972010",
    appId: "1:713199972010:web:f7b714afb61d18d2426ad3"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export default firebase;

