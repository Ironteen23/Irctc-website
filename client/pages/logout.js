import React from "react";
import { useContext } from "react";
import AppContext from "../components/AppContext/AppContext";

const logout = () => {
  const myContext = useContext(AppContext);
  //   myContext.toggle();
  const setFalse = () => {
    myContext.toggle();
    myContext.isloggedIn = false;
    console.log(myContext.isloggedIn);
    console.log("clicked");
  };
  return (
    <div onClick={setFalse} style={{ backgroundColor: "blue" }}>
      logged Out sucessfully
    </div>
  );
};

export default logout;
