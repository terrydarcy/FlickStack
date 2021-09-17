import React, { useState, useEffect } from "react";
import styles from "./styles/HeaderProfileWidget.module.css";

const HeaderProfileWidget = ({ user }) => {
  const [photoURL_, setPhotoURL] = useState("");

  useEffect(() => {
    const { photoURL } = user;
    console.log(user);
    if (user) {
      setPhotoURL(photoURL);
    }
  }, [user]);

  return (
    <img className={styles.rounded_profile} src={photoURL_} alt="profile" />
  );
};

export default HeaderProfileWidget;
