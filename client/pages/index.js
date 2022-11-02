import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginForm from "../components/loginForm/LoginForm";
import homePic from "../public/images/trainpichomepage.jpeg";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useContext } from "react";
import AppContext from "../components/AppContext/AppContext";
// import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState({ username: "" });
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState([]);

  const myContext = useContext(AppContext);
  const lol = myContext.loggedusername;

  user["username"] = lol;

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setUser((prevState) => {
  //     console.log(user);
  //     return {
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  // setUser((prevState) => {
  //   console.log(user);
  //   return {
  //     ...prevState,
  //     ["username"]: lol,
  //   };
  // });
  // const handleModify = async (e) =>{

  //      e.preventDefault();
  //   console.log("clicked on register");
  //   console.log(user);
  //   const submitValues = { ...user };
  //   console.log("Values submitted: ", submitValues);
  //   const response = await fetch(
  //     "http://localhost:5000/api/v1/bookings/update",
  //     {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(submitValues),
  //     }
  //   );

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on register");
    console.log(user);
    const submitValues = { ...user };
    console.log("Values submitted: ", submitValues);
    const response = await fetch(
      "http://localhost:5000/api/v1/bookings/specific",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitValues),
      }
    );
    if (response.status === 200) {
      setShow(true);
      // setLoggedName()
      toast.success("Req successfully", {
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
    } else if (response.status === 400) {
      setShow(true);
      toast.error(`NO JOURNEYS`, {
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
    setTicket(data.books);
    console.log("DATA");
    console.log(data);
  };

  useEffect(() => {
    handleSubmit;
    // setLoggedName(data.name);
    console.log("TICKET");
    console.log(ticket);
    // console.log("DATA");
    // console.log(data);
  }, [ticket]);

  return (
    <>
      <div className={styles["outer-container"]}>
        <Image src={homePic} height="960px" width="1860px" />
        <div className={styles["title-cont"]}>
          <h1 className={styles["title-head"]}>WELCOME TO INDIAN RAILWAYS</h1>
        </div>
        {myContext.isloggedIn && myContext.loggedusername !== "Admin" ? (
          <div className={styles["login-cont-3"]}>
            <div className={styles["outer-cont"]}>
              <h4>VIEW MY JOURNEYS </h4>
              <div className={styles["input-outer-cont"]}>
                {/* <h6 style={{ textAlign: "left" }}>Username</h6>
                <input
                  placeholder="Enter username"
                  className={styles["input-cont"]}
                  name="username"
                  onChange={handleChange}
                /> */}
                {/* 
                <h6 style={{ textAlign: "left" }}>Password</h6>
                <input
                  placeholder="Password"
                  className={styles["input-cont"]}
                /> */}
                <button
                  className={styles["search-btn-3"]}
                  onClick={handleSubmit}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {myContext.loggedusername === "Admin" ? (
          <div className={styles["login-cont-2"]}>
            <h2>View all users</h2>
            <Link href={"/allusers"}>
              <button className={styles["search-btn-2"]}>View All users</button>
            </Link>
          </div>
        ) : null}
        {show ? (
          <div>
            Journeys
            <ToastContainer />
          </div>
        ) : null}
        {ticket ? (
          <div>
            {ticket.map((ticket, i) => {
              return (
                <div key={i} className={styles["ticket-cont"]}>
                  <h1>{ticket._id}</h1>
                  <h2>{ticket.trainName}</h2>
                  <h2>{ticket.src}</h2>
                  <h2>{ticket.dest}</h2>
                  <h2>{ticket.arrivalTime}</h2>
                  <h2>{ticket.depTime}</h2>
                  <h2>QTY :{ticket.Qty}</h2>
                  <h2>FARE : {ticket.fare}</h2>
                  <h2>Type : {ticket.coachType}</h2>
                  <h1>STATUS : {ticket.status}</h1>
                  <Link href={"/" + ticket._id}>
                    <button>DELETE TICKET</button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <h2> No Journey</h2>
        )}
      </div>
    </>
  );
}
