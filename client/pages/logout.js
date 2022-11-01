import React from "react";
import { useContext } from "react";
import styles from "../styles/Logout.module.css";
import AppContext from "../components/AppContext/AppContext";

const logout = () => {
  const myContext = useContext(AppContext);
  //   myContext.toggle();
  const setFalse = () => {
    myContext.toggle();
    myContext.isloggedIn = false;
    myContext.action("");
    console.log(myContext.isloggedIn);
    console.log("clicked");
  };
  return (
    <div className={styles["logout-cont"]}>
      <h1>PLEASE CLICK HERE TO LOG OUT</h1>
      {/* <button onClick={setFalse}>LOGOUT</button> */}
      {!myContext.isloggedIn ? (
        <h2>Logged out successfully</h2>
      ) : (
        <button onClick={setFalse}>LOGOUT</button>
      )}
    </div>
  );
};

export default logout;
