import styles from "./styles/Login.module.css";
import React, { useState } from "react";
import firebase, { generateUserDocument } from "../config/fire";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const signUpWithEmailAndPassword = async (
    event,
    displayName,
    email_,
    password_
  ) => {
    event.preventDefault();
    const seed = Math.floor(Math.random() * Math.floor(5000));
    const photoURL = "https://picsum.photos/seed/" + seed + "/200";
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email_, password_);
      generateUserDocument(user, { displayName, photoURL });
    } catch (err) {
      document.getElementById("error").innerHTML = err.message;
      setError(error);
      console.log(error);
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.getElementById("displayName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setEmail("");
        setPassword("");
        setDisplayName("");
        history.push("/");
      }
    });
  };

  return (
    <div id="createAccount">
      <h2 className={styles.login_title}>Create An Account</h2>
      <br />
      <div className={styles.input_container}>
        <input
          className={styles.input_login}
          placeholder="Username"
          id="displayName"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        ></input>
      </div>
      <br></br>

      <div className={styles.input_container}>
        <input
          className={styles.input_login}
          placeholder="Email"
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <br></br>
      <div className={styles.input_container}>
        <input
          className={styles.input_login}
          placeholder="Password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      <br />
      <div id="error" className={styles.error}></div>
      <br />

      <div className={styles.button_container}>
        <Button
          className={styles.login_button0}
          onClick={(e) =>
            signUpWithEmailAndPassword(e, displayName, email, password)
          }
        >
          Create Account
        </Button>
        <Button
          className={styles.login_button1}
          onClick={() => (window.location.href = "./Login")}
        >
          Log In Instead
        </Button>
      </div>
    </div>
  );
}

export default CreateAccount;
