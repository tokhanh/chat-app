import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvSSjAXjlulSUWbhjKXB5YwYcngF14RqE",
    authDomain: "chat-app-8bcd3.firebaseapp.com",
    databaseURL: "https://chat-app-8bcd3.firebaseio.com",
    projectId: "chat-app-8bcd3",
    storageBucket: "chat-app-8bcd3.appspot.com",
    messagingSenderId: "132700100861",
    appId: "1:132700100861:web:9ec6e32f873f8d1d414694"
};
 
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const db = app.firestore();

export default app;

