import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDNB4WdvpUv8w1WloqI2S1ayKxn79QE5hQ",
  authDomain: "pickflix-10db9.firebaseapp.com",
  projectId: "pickflix-10db9",
  storageBucket: "pickflix-10db9.appspot.com",
  messagingSenderId: "853158410547",
  appId: "1:853158410547:web:c5930667a7e46763c9a646",
  measurementId: "G-X3GNYP8L08",
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const checkLogin = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      return user;
    } else {
      return false;
    }
  });
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firebase.firestore().doc(`Users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        email,
        displayName,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firebase.firestore().doc(`Users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export default fire;
