import React from "react";
import styles from "../../styles/LoginForm.module.css";

const LoginForm = () => {
  return (
    <>
      <div className={styles["outer-cont"]}>
        <h4>BOOK TICKET </h4>
        <div className={styles["input-outer-cont"]}>
          <h6 style={{ textAlign: "left" }}>From</h6>
          <input placeholder="From" className={styles["input-cont"]} />

          <h6 style={{ textAlign: "left" }}>To</h6>
          <input placeholder="To" className={styles["input-cont"]} />

          <h6 style={{ textAlign: "left" }}>Date</h6>
          <input placeholder="18-10-2022" className={styles["input-cont"]} />

          <button className={styles["search-btn"]}>Search Trains</button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
