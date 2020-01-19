import firebase from "firebase";

const config = {
    apiKey: "AIzaSyB_u-YqCitmVbfM0dM-YZJzve3M-m8vvls",
    authDomain: "click-base-online.firebaseapp.com",
    databaseURL: "https://click-base-online.firebaseio.com",
    projectId: "click-base-online",
    storageBucket: "click-base-online.appspot.com",
    messagingSenderId: "441921164431",
    appId: "1:441921164431:web:0993b9f3fe8633a7260cfa",
    measurementId: "G-BX5LJNE75H"
};

const fire = firebase.initializeApp(config);
export default fire;
