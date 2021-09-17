import React, { useEffect, useState} from "react";
import MovieCards from "../components/MovieCards";
import styles from "./styles/Swipe.module.css";
 

function Swipe() {

  return (
    <div className={styles.swiping_container}>
      <MovieCards />
      {/* <h1 style={{position: "fixed"}}>{functionsTest}</h1> */}
    </div>
  );
}

export default Swipe;
