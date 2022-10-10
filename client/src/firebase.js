import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCeZXEg4WQn99_58Ly7kKwwX2Dkx67dm0o",
    authDomain: "mern-ecommerce-2022.firebaseapp.com",
    projectId: "mern-ecommerce-2022",
    storageBucket: "mern-ecommerce-2022.appspot.com",
    messagingSenderId: "573242385618",
    appId: "1:573242385618:web:762d16849a52428aa9b90b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
