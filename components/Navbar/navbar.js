import React from "react";
import styles from "../../styles/Navbar.module.css";

const navbar = () => {
  return (
    <div className={styles["navbar-cont"]}>
      <div className={styles["navbar-logo-cont"]}>
        <h1>logo</h1>
      </div>
      <ul className={styles["navbar-links-cont"]}>
        <li className={styles["navbar-links"]}>Home</li>
        <li className={styles["navbar-links"]}>Login</li>
        <li className={styles["navbar-links"]}>SignUp</li>
      </ul>
    </div>
  );
};

export default navbar;
