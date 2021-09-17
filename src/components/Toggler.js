import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/actions";
import "react-toggle/style.css";
import Toggle from "react-toggle";

const Toggler = () => {
  const dispatch = useDispatch();
  const [theme, setTheme_] = useState("light");
  const [toggleBool, setToggleBool] = useState(
    window.localStorage.getItem("theme") === "dark" ? true : false
  );

  const setMode = useCallback(
    (mode) => {
      window.localStorage.setItem("theme", mode);
      dispatch(setTheme(mode));
      setTheme_(mode);

      if ((mode = "light")) {
        setToggleBool(true);
      } else {
        setToggleBool(false);
      }
    },
    [dispatch]
  );

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme != null) {
      setMode(localTheme);
    } else {
      setMode("light");
    }
  }, [setMode]);

  return (
    <Toggle
      defaultChecked={toggleBool}
      icons={{
        checked: <Dark />,
        unchecked: <Light />,
      }}
      className="toggle"
      onChange={toggleTheme}
    />
  );
};

const Light = () => {
  return (
    <i
      className="fas fa-moon fa-sm"
      style={{ lineHeight: 0.8, color: "#ffffff", paddingRight: 5 }}
    ></i>
  );
};

const Dark = () => {
  return (
    <i
      className="fas fa-sun fa-x2"
      style={{ lineHeight: 0.8, color: "#ffffff", paddingRight: 5 }}
    ></i>
  );
};

export default Toggler;
