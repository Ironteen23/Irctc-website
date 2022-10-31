import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext/AppContext";
{
  /* <Routes>
  <Route index element={<App />} />
  <Route path="login" element={<Login />} />
  <Route path="dashboard" element={<Dashboard />} />
</Routes>; */
}

const navbar = () => {
  const myContext = useContext(AppContext);

  useEffect(
    () => {
      console.log("State of logged user");
      console.log(myContext.isloggedIn);
    },
    [myContext.isloggedIn],
    [myContext.loggedusername]
  );

  return (
    <div className={styles["navbar-cont"]}>
      <div className={styles["navbar-logo-cont"]}>
        <h1>logo</h1>
      </div>
      {/* <Routes> */}
      <ul className={styles["navbar-links-cont"]}>
        <Link href={"/"}>
          <li className={styles["navbar-links"]}>Home</li>
        </Link>
        {/* <Route index element={<Front />} >
          Home
        </Route> */}
        <Link href={"/search"}>
          <li className={styles["navbar-links"]}>Trains</li>
        </Link>

        {myContext.isloggedIn ? (
          <Link href={"/logout/"}>
            <li className={styles["navbar-links"]}>Logout</li>
          </Link>
        ) : (
          <Link href={"/login/"}>
            <li className={styles["navbar-links"]}>Login</li>
          </Link>
        )}
        {/* <Route path="login" element={<Login />}>
          Login */}
        {/* </Route> */}
        {myContext.isloggedIn ? (
          <h2>{myContext.loggedusername}</h2>
        ) : (
          <Link href={"/signup"}>
            <li className={styles["navbar-links"]}>Sign-Up</li>
          </Link>
        )}
      </ul>
      {/* </Routes> */}
    </div>
  );
};

export default navbar;
