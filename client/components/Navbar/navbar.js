import React from "react";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

const navbar = () => {
  return (
    <div className={styles["navbar-cont"]}>
      <div className={styles["navbar-logo-cont"]}>
        <h1>logo</h1>
      </div>
      <ul className={styles["navbar-links-cont"]}>
        <Link href={"/"}>
          <li className={styles["navbar-links"]}>Home</li>
        </Link>
        <Link href={"/login/"}>
          <li className={styles["navbar-links"]}>Login</li>
        </Link>
        <Link href={"/signup"}>
          <li className={styles["navbar-links"]}>SignUp</li>
        </Link>
      </ul>
    </div>
  );
};

export default navbar;
