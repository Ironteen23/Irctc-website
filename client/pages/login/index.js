import React, { useEffect } from "react";
import styles from "../../styles/Login.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import Link from "next/link";
import AppContext from "../../components/AppContext/AppContext";
import { ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const index = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", password: "" });
  const [show, setShow] = useState(false);
  const [loggedname, setLoggedName] = useState("");

  const myContext = useContext(AppContext);

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
      setShow(true);
      // setLoggedName()
      toast.success("Login successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // navigate("/");
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
      toast.error(`NO User Found , Please Signup`, {
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

    if (response.status === 200) {
      setLoggedName(data.user.name);
      // myContext.user_name = data.user.name;
    }

    console.log("USERNAME");
    console.log(loggedname);
    console.log("DATA");
    console.log(data);
  };

  useEffect(() => {
    handleSubmit;
    // setLoggedName(data.name);
    console.log("USERNAME");
    console.log(loggedname);
    myContext.loggedusername = loggedname;
    console.log("LOLERS");
    console.log(myContext.loggedusername);
    // console.log("DATA");
    // console.log(data);
  }, [loggedname]);

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

          <div className={styles["change-link"]}>
            <Link href={"/login/changePassword"}>Change Password</Link>
          </div>
        </div>
      </div>
      {show ? (
        // <div>
        <ToastContainer />
      ) : null}
    </>
  );
};

export default index;
