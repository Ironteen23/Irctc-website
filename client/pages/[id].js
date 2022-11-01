import React, { useEffect } from "react";
import styles from "../styles/TicketDel.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const test = () => {
  const [data, setData] = useState([]);
  const [newdet, setNewDet] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    train_id: "",
    Qty: "",
    coachType: "",
    ticket_id: "",
  });

  const getData = async () => {
    var query = window.location.href.split("3000/");
    console.log("query");
    console.log(query[1]);
    const id = query[1];
    // const id = context.params.id;
    const res = await fetch("http://localhost:5000/api/v1/bookings/" + id);
    const ticket = await res.json();
    console.log("ttrain");
    console.log(ticket);
    setData(ticket.book);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on register");
    console.log(user);
    const submitValues = { ...user };
    console.log("Values submitted: ", submitValues);
    const response = await fetch(
      "http://localhost:5000/api/v1/bookings/update",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitValues),
      }
    );
    const newTicket = await response.json();

    if (response.status === 200) {
      setShow(true);
      toast.success("Delete successfull", {
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
      toast.info(`Thank you for Choosing Us`, {
        position: "bottom-right",
      });
    } else if (response.status === 404) {
      setShow(true);
      toast.error(`No such booking`, {
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
      toast.error(`Internal Error Please Try Again`, {
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

    setNewDet(newTicket);
  };

  useEffect(
    () => {
      getData;
      handleSubmit;
      console.log("data : ", data);
      console.log("NEW_DATA_ ", newdet);
      if (data.length != 0) {
        setUser((prevState) => {
          console.log(user);
          return {
            ...prevState,
            //  [e.target.name]: e.target.value,
            // setTicket
            ["train_id"]: data.train_id,
            //   setTicket
            ["Qty"]: data.Qty,
            //   setTicket

            ["ticket_id"]: data._id,

            ["coachType"]: data.coachType,

            //   ["status"]: "Confirmed",
          };
        });
      }
    },
    [data],
    [newdet]
  );

  return (
    <>
      <div className={styles["full-cont"]} onClick={getData}>
        LOL
        {(data && data.length) != 0 ? (
          <div className={styles["ticket-cont"]}>
            <h2>Train Name:{data.trainName}</h2>
            <h2>Train ID:{data.train_id}</h2>
            <h2>Ticket ID :{data._id}</h2>
            <h2>Distance :{data.distance}</h2>
            <h2>Source:{data.src}</h2>
            <h2>Arr Time:{data.arrivalTime}</h2>
            <h2>Dep Time:{data.depTime}</h2>
            <h2>Destination:{data.dest}</h2>
            <h2>Qty:{data.Qty}</h2>
            <h2>Coach Type:{data.coachType}</h2>
            <h2>Date :{data.date}</h2>
            <h2>Status:{data.status}</h2>
            {data.status === "Confirmed" ? (
              <button className={styles["del-btn"]} onClick={handleSubmit}>
                Confirm Delete
              </button>
            ) : null}
          </div>
        ) : null}
        {show ? <ToastContainer /> : null}
      </div>
    </>
  );
};

export default test;
