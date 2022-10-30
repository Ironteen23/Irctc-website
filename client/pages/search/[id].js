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
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    trainName: "",
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
  //     ["username"]: { user },
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

  useEffect(() => {
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

          //   setTicket
          ["arrivalTime"]: data.arrivalTime,
          //   setTicket
          ["depTime"]: data.depTime,
        };
      });

      //   if (data.coachType === "AC") {
      //     let a = data.acFare;
      //     let b = data.Qty;
      //     const c = a * b;
      //     setPrice(c);
      //   }
      //   else {
      //     let a = data.genFare;
      //     let b = data.Qty;
      //     const c = a * b;
      //     setPrice(c);
      //   }
      //   setTicket[trainName] = data.name;
      //   setTicket[src] = data.src;
      //   setTicket[dest] = data.dest;
      //   setTicket[distance] = data.distance;
      //   setTicket[date] = data.date;
      //   setTicket[arrivalTime] = data.arrivalTime;
      //   setTicket[depTime] = data.depTime;
    }
  }, [data]);

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

  const bookTicket = async () => {
    const res = await fetch("http://localhost:5000/api/v1/booking/");
    const train = await res.json();
    console.log("ttrain");
    console.log(train);
    setData(train.train);
  };

  return (
    <>
      <div className={styles["page-cont"]} onClick={getData}>
        {(data && data.length) != 0 ? (
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
                  placeholder="Enter Username"
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
                  <option>AC</option>
                  <option>General</option>
                </select>
              </label>
            </div>
            <button onClick={getFare}>Get Fare</button>
            <h2>Fare : Rs {ticket.fare}</h2>

            <button onClick={bookTicket}>BOOK TICKET</button>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </>
  );
};

export default test;
