import React, { useState } from "react";
import styles from "../styles/CreateTrain.module.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createtrains = () => {
  const [show, setShow] = useState(false);

  const [trains, setTrains] = useState({
    name: "",
    src: "",
    dest: "",
    distance: "",
    ACSeats: "",
    genSeats: "",
    acFare: "",
    genFare: "",
    date: "",
    arrivalTime: "",
    depTime: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setTrains((prevState) => {
      console.log(trains);
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on register");
    console.log(trains);
    const submitValues = { ...trains };
    console.log("Values submitted: ", submitValues);
    const response = await fetch("http://localhost:5000/api/v1/trains", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });
    if (response.status === 201) {
      setShow(true);
      toast.success("Train created successfully", {
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
      toast.info(`New Train added to DB`, {
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
    } else if (response.status === 500) {
      setShow(true);
      toast.error(`Internal error`, {
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
          <h2>Create New Train</h2>
          <form>
            <div className={styles["prop-container"]}>
              <label>
                Train Name:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter TrainName"
                  onChange={handleChange}
                  name="name"
                />
              </label>
            </div>
            <div className={styles["prop-container"]}>
              <label>
                Source Station Code:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Source"
                  onChange={handleChange}
                  name="src"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                Destination Station Code:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Dest"
                  onChange={handleChange}
                  name="dest"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                Distance:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Distance"
                  onChange={handleChange}
                  name="distance"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                AC Seats No:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Number"
                  onChange={handleChange}
                  name="ACSeats"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                General Seats No:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Number"
                  onChange={handleChange}
                  name="genSeats"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                AC Fare:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Number"
                  onChange={handleChange}
                  name="acFare"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                General Fare:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Number"
                  onChange={handleChange}
                  name="genFare"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                Date:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Date"
                  onChange={handleChange}
                  name="date"
                />
              </label>
            </div>
            <div className={styles["prop-container"]}>
              <label>
                Arrival Time:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Time"
                  onChange={handleChange}
                  name="arrivalTime"
                />
              </label>
            </div>

            <div className={styles["prop-container"]}>
              <label>
                Depature Time:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Time"
                  onChange={handleChange}
                  name="depTime"
                />
              </label>
            </div>
          </form>

          <button className={styles["login-btn"]} onClick={handleSubmit}>
            Create
          </button>

          {/* <div className={styles["change-link"]}>
            <Link href={"/login/changePassword"}>Change Password</Link>
          </div> */}
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

export default createtrains;
