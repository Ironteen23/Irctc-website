import "../styles/globals.css";
import Navbar from "../components/Navbar/navbar";
import React, { useState } from "react";
import AppContext from "../components/AppContext/AppContext";

function MyApp({ Component, pageProps }) {
  const [loggedusername, setLoggedUserName] = useState("");
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const toggle = () => {
    let a = isloggedIn;
    setIsLoggedIn(!a);
  };

  const action = (username) => {
    setLoggedUserName(username);
  };

  const userSettings = {
    isloggedIn: isloggedIn,
    loggedusername: loggedusername,
    toggle,
    action,
  };

  return (
    <>
      <AppContext.Provider value={userSettings}>
        <Navbar />
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
