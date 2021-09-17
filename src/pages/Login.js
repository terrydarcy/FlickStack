import styles from "./styles/Login.module.css";
import React, { useState } from "react";
import firebase from "../config/fire";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState(null);
  let history = useHistory();

  const logInWithEmailAndPassword = (event, email_, password_) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email_, password_)
      .catch((err) => {
        document.getElementById("error").innerHTML = err.message;
        setError(err);
        console.error("Error signing in with password and email", err);
      });

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setEmail("");
        setPassword("");
        history.push("/");
      } else {
        // No user is signed in.
      }
    });
  };

  return (
    <div id="loginPage">
       <h1 className={styles.login_title}>Login</h1>
      <br />

      <div className={styles.input_container}>
        <input
          className={styles.input_login}
          placeholder="Email"
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <br/>
      <div className={styles.input_container}>
        <input
          className={styles.input_login}
          id="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      <br />
      <div id="error" className={styles.error}></div>
      <br />

      <div className={styles.button_container}>
        <Button
          variant="contained"
          className={styles.login_button0}
          size="medium"
          onClick={(e) => logInWithEmailAndPassword(e, email, password)}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          className={styles.login_button1}
          size="medium"
          onClick={() => (window.location.href = "./CreateAccount")}
        >
          Create an Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
