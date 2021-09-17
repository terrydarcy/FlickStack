import React from "react";
import App from "./App";
import UserProvider from "./providers/UserProvider";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { useSelector } from "react-redux";

const DataWrapper = () => {
  const theme = useSelector((state) => state.setTheme);

  return (
    <UserProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </UserProvider>
  );
};

export default DataWrapper;
