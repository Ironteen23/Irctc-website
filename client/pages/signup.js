import React from "react";
import styles from "../styles/SignUp.module.css";
import { useState } from "react";
import UserApi from "./api/UserApi";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signup = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [show, setShow] = useState(false);

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
    const response = await fetch("http://localhost:5000/api/v1/users/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });
    if (response.status === 201) {
      setShow(true);
      toast.success("Registered successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(`sucessfully signup`);
      toast.info(`Thank you for Signing Up`, {
        position: "bottom-right",
      });
    } else if (response.status === 401) {
      setShow(true);
      toast.error(`SAME USERNAME ALREADY EXISTS`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response.status === 400) {
      setShow(true);
      toast.error(`Please Enter Username , Password`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // setLoading(false);
    const data = await response.json();

    console.log(data);
  };

  // const createUserData = () => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   };
  //   // const body = JSON.stringify(user);
  //   const tp = {
  //     name: user.name,
  //     password: user.password,
  //   };
  //   const body = tp;
  //   console.log("lol here is the user obj from frontend");
  //   console.log(body);
  //   // console.log(body);
  //   UserApi.post("/users/signup", body, config)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

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

          <button className={styles["login-btn"]} onClick={handleSubmit}>
            SignUp
          </button>
        </div>
      </div>
      {show ? (
        <ToastContainer />
      ) : //   <p style={{ fontSize: "2rem", color: "black" }}>SIGNUP SUCESSFUL</p>
      // </div>
      null}
    </>
  );
};

export default signup;
