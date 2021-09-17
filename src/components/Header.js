import React, { useState, useContext } from "react";
import styles from "./styles/Header.module.css";
import { AppBar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import firebase from "../config/fire";
import { UserContext } from "../providers/UserProvider";
import HeaderProfileWidget from "./HeaderProfileWidget";
import { useHistory } from "react-router";
import Toggler from "./Toggler";

function Header() {
  const user = useContext(UserContext);
  let history = useHistory();
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickLoggedIn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (document.body.contains(document.getElementById("profile-button"))) {
      document.getElementById("profile-button").style.color = "white";
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/song/" + value);
    window.location.reload(false);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <AppBar position="static">
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          <Link to="/" className={styles.link}>
            <IconButton style={{ overflow: "visible" }}>
              <h1 className={styles.title_color}>flick<span className={styles.title_color1}>stack</span></h1>
            </IconButton>
          </Link>
        </div>
        <div className={styles.header_Search}>
          <div className={styles.search_bar}>
            <div style={{ flex: 1 }} className={styles.search_icon_container}>
              <i className="fas fa-search fa-lg" />
            </div>
            <div style={{ flex: 20 }} className={styles.searc_text_area}>
              <form style={{ width: "100%" }}>
                <input
                  value={value}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                  className={styles.input_field}
                  id="searchText"
                  placeholder="Start typing to search a movie"
                  style={{ paddingLeft: 5 }}
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  style={{ display: "none" }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.header_navigation}>
          <Toggler />

          {user ? (
            <IconButton
              aria-controls="fade-menu-liked"
              aria-haspopup="true"
              onClick={handleClickLoggedIn}
            >
              <HeaderProfileWidget user={user} />{" "}
            </IconButton>
          ) : (
            <div className={styles.profile_button_circle}>
              <IconButton
                className={styles.profile_button}
                size="medium"
                onClick={() => history.push("/login")}
              >
                <i className="far fa-user fa-s"></i>
              </IconButton>
            </div>
          )}
        </div>
      </div>

      <Menu
        id="fade-menu-profile"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
        PaperProps={{
          style: {
            backgroundColor: "var(--primary)",
            paddingLeft: "10px",
            paddingRight: "10px",
          },
        }}
      >
        <Link to="/Profile" className={styles.header_links}>
          <MenuItem className={styles.header_links} onClick={handleClose}>
            Profile
          </MenuItem>
        </Link>

        <Link to="/" className={styles.header_links}>
          <MenuItem
            className={styles.header_links}
            onClick={() => firebase.auth().signOut()}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </AppBar>
  );
}

export default Header;
