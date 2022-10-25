import React from "react";
import styles from "../styles/SignUp.module.css";
import { useState } from "react";
import UserApi from "./api/UserApi";

const signup = () => {
  const [user, setUser] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prevState) => {
      console.log(user);
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createUserData = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(user);

    UserApi.post("/users/", body, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className={styles["outer-cont"]}>
        <div>
          <h2>Sign-Up</h2>
          <form>
            <div className={styles["prop-container"]}>
              <label>
                Name:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Username"
                  onChange={handleChange}
                  name="name"
                />
              </label>
            </div>
            <div className={styles["prop-container"]}>
              <label>
                Password
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  name="password"
                />
              </label>
            </div>
          </form>

          <button className={styles["login-btn"]} onClick={createUserData}>
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default signup;
