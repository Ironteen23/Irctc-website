import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import AppContext from "../../components/AppContext/AppContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import styles from "../../styles/Idallusers.module.css";

const jid = () => {
  const myContext = useContext(AppContext);
  const uname = myContext.loggedusername;
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ username: "" });
  const [show, setShow] = useState(false);
  //   const [username, setUsername] = useState("");

  const getData = async () => {
    // const id = query[1];
    var query = window.location.href.split("allusers/");
    console.log("query");
    console.log(query[1]);
    const id = query[1];
    console.log("id");
    console.log(id);
    // setUsername(id);

    setUser((prevState) => {
      console.log(user);
      return {
        ...prevState,
        ["username"]: id,
      };
    });

    // setUser(id);
    console.log("kya submit hua");
    console.log(user);

    // const id = context.params.id;
    // const res = await fetch(
    //   "http://localhost:5000/api/v1/bookings/"
    // );
    // const train = await res.json();
    // console.log("ttrain");
    // console.log(train);
    // setData(train.train);
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
    } else if (response.status === 401) {
      setShow(true);
      toast.warning(`Loading , press again`, {
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
    const ticket = await response.json();
    setData(ticket.books);
    console.log("Ticket");
    console.log(ticket);
  };

  useEffect(() => {
    getData;
    // setLoggedName(data.name);
    console.log("DATA");
    console.log(data);
    // console.log("DATA");
    // console.log(data);
  }, [data]);

  return (
    <>
      <div className={styles["admin-get-ticket"]}>
        <div>
          <h1>Get user Data</h1>
        </div>
        <button onClick={getData} className={styles["data-btn"]}>
          Get Bookings
        </button>
      </div>
      {show ? <ToastContainer /> : null}
      {data ? (
        <div>
          {data.map((ticket, i) => {
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
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default jid;
