import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "../../components/AppContext/AppContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Allusers.module.css";
import Link from "next/link";

const index = () => {
  const [det, setDet] = useState([]);
  const [show, setShow] = useState(false);

  const myContext = useContext(AppContext);

  const getData = async () => {
    const res = await fetch("http://localhost:5000/api/v1/users/admin/");
    const data = await res.json();

    if (res.status === 200) {
      setShow(true);
      setDet(data.users);
      toast.success("Request Sucessful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setShow(true);
      toast.error("Internal error , please try later", {
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
    console.log("DATA");
    console.log(data);
    // setDet(data.users);
  };

  useEffect(() => {
    getData;
    console.log("det");
    console.log(det);
  }, [det]);

  //   const myContext = useContext(AppContext);

  return (
    <>
      {myContext.loggedusername === "Admin" ? (
        <div>
          <div className={styles["beg-cont"]}>
            <h2>ALL USERS</h2>
            <button onClick={getData}>Get all users</button>
          </div>
          {det && det.length != 0 ? (
            <div>
              {det.map((arr, i) => {
                return (
                  <div className={styles["user-cont"]} key={i}>
                    <h2>{arr.name}</h2>
                    <h2>{arr._id}</h2>
                    <Link href={"/allusers/" + arr.name}>
                      <button>View Journeys </button>
                    </Link>
                  </div>
                );
              })}
              {/* <h1>LOL</h1> */}
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <h1>Unauthorized access</h1>
        </div>
      )}
      {show ? <ToastContainer /> : null}
    </>
  );
};

export default index;
