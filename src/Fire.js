import firebase from "firebase";
const init = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyBeattxTPn0EQyTrnqH25MTVqutlcymU90",
    authDomain: "lettersolutions-585c7.firebaseapp.com",
    projectId: "lettersolutions-585c7",
    storageBucket: "lettersolutions-585c7.appspot.com",
    messagingSenderId: "1031170241076",
    appId: "1:1031170241076:web:3d8566d8ab34c0360b9061",
    measurementId: "G-4VG5CCC652"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

if (firebase.apps.length == 0) {
  init();
}


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();






const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = (history) => {
  auth.signInWithPopup(googleProvider).then((user) => {
    db.collection("Users")
      .doc(user.user.uid)
      .get()
      .then((snap) => {
        if (!snap.exists) {
          db.collection("Users").doc(user.user.uid).set({
            email: user.user.email,
            name: user.user.displayName,
            address: null,
            role: "user",
            timeOfCreation: firebase.firestore.FieldValue.serverTimestamp(),
            continue: null
          });
        }
        history.push("/");
      });
  });
};



export { db, auth, storage, signInWithGoogle, init, firebase };
