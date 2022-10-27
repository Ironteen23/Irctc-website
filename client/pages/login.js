import React from "react";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on register");
    console.log(user);
    const submitValues = { ...user };
    console.log("Values submitted: ", submitValues);
    const response = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });
    if (response.status === 200) {
      // setShow(true);
      toast.success("Login successfully");
      // toast.info(`Confirmation email sent`);
    }
    // setLoading(false);
    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <div className={styles["outer-cont"]}>
        <div>
          <h2>Login</h2>
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
                Password:
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

          <button className={styles["login-btn"]} onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default login;