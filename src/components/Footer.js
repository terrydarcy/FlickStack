import React from "react";
import styles from "./styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.footerFlex}>
      <div className={styles.footer}>
        <p>FlickStack © 2021 Terry D'Arcy &amp; Elvinas Paskauskas </p>
        <a href="./" className={styles.footer_link}>
          Terms of service
        </a>
      </div>
    </div>
  );
}

export default Footer;
