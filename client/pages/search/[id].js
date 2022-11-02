import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/Id.module.css";
import { useContext } from "react";
import AppContext from "../../components/AppContext/AppContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const res = await fetch("http://localhost:5000/api/v1/trains/specific/" + id);
//   const data = await res.json();

//   return {
//     props: { train: data },
//   };
// };

const test = () => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);
  const [newfare, setNewFare] = useState({
    newACfare: "",
    newGenfare: "",
    id: "",
  });
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    trainName: "",
    train_id: "",
    username: "",
    src: "",
    dest: "",
    distance: "",
    coachType: "",
    Qty: "",
    fare: "",
    date: "",
    arrivalTime: "",
    depTime: "",
  });

  const myContext = useContext(AppContext);
  const user = myContext.loggedusername;
  console.log("USRNAME");
  console.log(user);
  // setTicket((prevState) => {
  //   return {
  //     ...prevState,
  //     ["username"]: user,
  //   };
  // });

  const handleChange = (e) => {
    e.preventDefault();
    setTicket((prevState) => {
      console.log(ticket);
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const modifyChange = (e) => {
    e.preventDefault();
    setNewFare((prevState) => {
      console.log(ticket);
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getData = async () => {
    var query = window.location.href.split("search/");
    console.log("query");
    console.log(query[1]);
    const id = query[1];
    // const id = context.params.id;
    const res = await fetch(
      "http://localhost:5000/api/v1/trains/specific/" + id
    );
    const train = await res.json();
    console.log("ttrain");
    console.log(train);
    setData(train.train);
  };

  useEffect(
    () => {
      getData;
      getFare;
      console.log("data");
      console.log(data);
      if (data.length != 0) {
        setTicket((prevState) => {
          console.log(ticket);
          return {
            ...prevState,
            //  [e.target.name]: e.target.value,
            // setTicket
            ["trainName"]: data.name,
            //   setTicket
            ["src"]: data.src,
            //   setTicket
            ["dest"]: data.dest,
            //   setTicket
            ["distance"]: data.distance,
            //   setTicket
            ["date"]: data.date,

            ["train_id"]: data._id,

            //   setTicket
            ["arrivalTime"]: data.arrivalTime,
            //   setTicket
            ["depTime"]: data.depTime,

            ["username"]: user,

            ["status"]: "Confirmed",
          };
        });

        setNewFare((prevState) => {
          console.log(ticket);
          return {
            ...prevState,
            //  [e.target.name]: e.target.value,
            // setTicket
            ["id"]: data._id,
          };
        });

        console.log("NEW FARE");
        console.log(newfare);
      }
    },
    [data],
    [newfare]
  );

  const getFare = () => {
    const q = ticket.Qty;
    console.log("lol");
    console.log(q);
    if (ticket.coachType === "AC") {
      const a = data.acFare;
      const c = a * q;
      setPrice(c);
      //   setTicket["fare"] = price;

      setTicket((prevState) => {
        return {
          ...prevState,
          ["fare"]: a * q,
          ["username"]: user,
          // ["coachType"]:
        };
      });
    } else {
      const a = data.genFare;
      const c = a * q;
      setPrice(c);

      setTicket((prevState) => {
        return {
          ...prevState,
          ["fare"]: a * q,
          ["username"]: user,
        };
      });
    }
    console.log("a");
    // console.log(a);
  };

  const changeCoachA = () => {
    setTicket((prevState) => {
      return {
        ...prevState,
        ["coachType"]: "AC",
      };
    });
  };

  const changeCoachG = () => {
    setTicket((prevState) => {
      return {
        ...prevState,
        ["coachType"]: "General",
      };
    });
  };

  const handleModify = async (e) => {
    e.preventDefault();
    console.log("clicked on register");
    console.log(newfare);
    const submitValues = { ...newfare };
    console.log("Values submitted: ", submitValues);
    const response = await fetch("http://localhost:5000/api/v1/trains/update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });
    if (response.status === 200) {
      setShow(true);
      toast.success("Modified successfull", {
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
      toast.error(`No Such Train found`, {
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
    // setLoading(false);
    const data = await response.json();
    console.log(data);
  };

  const bookTicket = async (e) => {
    // const res = await fetch("http://localhost:5000/api/v1/booking/");
    // const train = await res.json();
    // console.log("ttrain");
    // console.log(train);
    // setData(train.train);
    e.preventDefault();
    console.log("clicked on register");
    console.log(ticket);
    const submitValues = { ...ticket };
    console.log("Values submitted: ", submitValues);
    const response = await fetch("http://localhost:5000/api/v1/bookings/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });
    if (response.status === 201) {
      setShow(true);
      toast.success("Booking successfull", {
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
      toast.error(`Seats Not Available`, {
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
    // setLoading(false);
    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <div className={styles["page-cont"]} onClick={getData}>
        {/* { user !== "Admin" ? ( */}

        {user !== "Admin" && data && data.length != 0 ? (
          <div className={styles["ticket-cont"]}>
            <h2>{data.name}</h2>
            <h2>{data.data}</h2>
            <h2>{data._id}</h2>
            <h2>{data.distance}</h2>
            <h2>{data.src}</h2>
            <h2>{data.arrivalTime}</h2>
            <h2>{data.depTime}</h2>
            <h2>{data.dest}</h2>
            <div className={styles["prop-container"]}>
              <label>
                QTY:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Qty"
                  onChange={handleChange}
                  name="Qty"
                />
              </label>
            </div>
            <div className={styles["prop-container"]}>
              <label>
                coachType:
                <br></br>
                <select
                  className={styles["login-input"]}
                  type="text"
                  placeholder="Enter Username"
                  onChange={handleChange}
                  name="coachType"
                >
                  <option onClick={changeCoachA}>AC</option>
                  <option onClick={changeCoachG}>General</option>
                </select>
              </label>
            </div>
            <button onClick={getFare}>Get Fare</button>
            <h2>Fare : Rs {ticket.fare}</h2>

            <button onClick={bookTicket}>BOOK TICKET</button>
          </div>
        ) : null}
        {user === "Admin" && data && data.length != 0 ? (
          <div className={styles["modify-cont"]}>
            <h1>Train ID: {data._id}</h1>
            <h1>Train name:{data.name}</h1>
            <div className={styles["prop-container"]}>
              <label>
                New General Fare:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder=" New Genereal Fare"
                  onChange={modifyChange}
                  name="newGenfare"
                />
              </label>
            </div>
            <div className={styles["prop-container"]}>
              <label>
                New AC Fare:
                <br></br>
                <input
                  className={styles["login-input"]}
                  type="text"
                  placeholder=" New AC Fare"
                  onChange={modifyChange}
                  name="newACfare"
                />
              </label>
            </div>
            <button onClick={handleModify}>MODIFY FARES</button>
          </div>
        ) : null}
        {show ? <ToastContainer /> : null}
      </div>
    </>
  );
};

export default test;
