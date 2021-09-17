import React, { useContext, useState, useEffect } from "react";
import styles from "./styles/Profile.module.css";
import { Button, Card, List, ListItem } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router";
import firebase from "../config/fire";
import stylesLogin from "./styles/Login.module.css";

function Profile() {
  const user = useContext(UserContext);
  let history = useHistory();

  const [email_, setEmail] = useState("");
  const [displayName_, setDisplayName] = useState("");
  const [photoURL_, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
      console.log(email, displayName, photoURL);
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
    }
  }, [user]);

  const profile_logout = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const profile_deleteAccount = () => {
    firebase
      .auth()
      .currentUser.delete()
      .then(function () {
        history.push("/");
      });
  };

  return (
    <div className={styles.profile}>
      <Card className={styles.profile_card}>
        <div className={styles.profile_pic_container}>
          <img className={styles.profile_pic} src={photoURL_} alt="profile" />
        </div>
        <br />
        <div className={styles.user_info}>
          <List subheader="Profile" className={styles.profile_list_text}>
            <ListItem>
              Username: &nbsp;
              <div className={styles.profile_list_text_accent}>
                {displayName_}
              </div>
            </ListItem>
            <ListItem className={styles.profile_list_text}>
              Email: &nbsp;
              <div className={styles.profile_list_text_accent}>{email_}</div>
            </ListItem>
            <br />
            <Button
              className={stylesLogin.login_button0}
              onClick={() => profile_logout()}
            >
              Log out
            </Button>

            <Button
              color="secondary"
              className={stylesLogin.login_button1}
              onClick={() => profile_deleteAccount()}
            >
              Delete Account
            </Button>
          </List>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
