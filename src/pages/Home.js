import React, { useContext, useState, useEffect } from "react";
import styles from "./styles/Home.module.css";
import { Button, Card } from "@material-ui/core";
import bigLogo from "../res/flickshome.png";

import { UserContext } from "../providers/UserProvider";

function Home() {
  const user = useContext(UserContext);
  const [, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      const { displayName, photoURL } = user;
      setDisplayName(displayName);
      setPhotoURL(photoURL);
    }
  }, [user]);

  const loadLogin = () => {
    window.location.href = "./Login";
  };

  const loadCreateAccount = () => {
    window.location.href = "./CreateAccount";
  };

  return (
    <div className={styles.home}>
      <div className="home_spash_container">
        <div className="home_left">{/* <img src={bigLogo} alt="Logo" className="big_logo" /> */}</div>

        <div className="home_right">
          {user ? (
            <div>
              <div className="profile_pic_container">
                <img className="profile_pic_home" src={photoURL} width="100" style={{ marginTop: 30 }} alt="profile" />
              </div>
              <h1>Welcome to Flicks</h1>
              <h4 style={{ fontSize: 15 }}>Search for an artist or a song now using the search bar or view a popular song from the card below</h4>
            </div>
          ) : (
            <div>
              <h2 style={{ marginTop: 0, fontSize: 26 }}>Welcome to Flicks&trade;</h2>
              <h4 style={{ marginTop: 0, fontSize: 16 }}> Log in or create an account.</h4>

              <div style={{ width: "100%", fontFamily: "customHelvetica" }}>
                <Button variant="contained" style={{ fontFamily: "customHelvetica", marginRight: 20, color: "#283d3b", backgroundColor: "#ebebd3" }} size="medium" onClick={loadLogin}>
                  Log In
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#283d3b",
                     fontFamily: "customHelvetica",
                  }}
                  size="medium"
                  onClick={loadCreateAccount}
                >
                  Create an Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="info_container">
        <div className="info_container_div">
          <div className="steps">Create or join a group with friends</div>
          <div className="steps">Swipe movie cards </div>
          <div className="steps">Send reccomendations or find a movie match</div>
          <div className="steps">Build up a list of must watch movies</div>
        </div>
      </div>
      <div className="home_splash_card_area">
        <Card className="dataCard dataCard_home" style={{ borderRadius: 30, color: "black" }}>
          <div className="home_card_title">
            <h4 style={{ marginBottom: 15, color: "#283d3b" }}>Most Popular Flicks</h4>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
