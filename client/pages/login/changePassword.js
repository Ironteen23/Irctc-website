import React from "react";
import styles from "../../styles/Login.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const changePassword = () => {
  const [user, setUser] = useState({
    name: "",
    oldpassword: "",
    newpassword: "",
  });
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
    const response = await fetch(
      "http://localhost:5000/api/v1/users/login/change",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitValues),
      }
    );
    if (response.status === 200) {
      setShow(true);
      toast.success("Password Changed successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // toast.info(`Confirmation email sent`);
    } else if (response.status === 401) {
      setShow(true);
      toast.error(`INCORRECT PASSWORD`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response.status === 404) {
      setShow(true);
      toast.error(`Incorrect UserName `, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response.status === 500) {
      setShow(true);
      toast.error(`Unknown Error `, {
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

  return (
    <>
      <div className={styles["outer-cont"]}>
        <div>
          <h2>Change Password</h2>
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
                Old Password:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="password"
                  placeholder="Enter Old Password"
                  onChange={handleChange}
                  name="oldpassword"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                New Password:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="password"
                  placeholder="Enter New Password"
                  onChange={handleChange}
                  name="newpassword"
                />
              </label>
            </div>
          </form>

          <button className={styles["login-btn"]} onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
      {show ? (
        // <div>
        <ToastContainer />
      ) : null}
    </>
  );
};

export default changePassword;
